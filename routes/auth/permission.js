// middleware for doing role-based permissions
const permit = (...allowed) => {
  const isAllowed = role => allowed.indexOf(role) > -1;
  // return a middleware
  return (req, res, next) => {

    // Drivers usually take actions that only concern themselves
    // Function that compares the entring token uuid to the uuid coming from the request
		const compareUserTo = (paramId) => {
			(paramId !== undefined && req.tokenUuid === paramId) ? next() : res.status(403).json({ message: "Forbidden to drivers" });
		}

		const reqUuid = req.uuid;
    const reqParamsUuid = req.params.uuid

    // Testing uuid match
    console.log("Token uuid: " + req.tokenUuid)
    reqUuid === undefined ? console.log("Requested params uuid: " + reqParamsUuid) : console.log("Requested uuid: " + reqUuid);

    // If a role is passed in an argument, it's allowed to proceed
    if (isAllowed(req.role)) {
      switch (req.role) {
        // When the role is admin
        // If admins is allowed then it always pass
        case "admin":
          // Role is allowed, so continue on to the next middleware
          next();
          break;
        // When the role is driver or enterprise
        case "driver" || "enterprise":
          // Performs an uuid comparison check depending on the route
          switch (req.baseUrl) {
            case '':
              next()
              break;
            case '/users':
              compareUserTo(reqParamsUuid); 
              break;
            default:
              compareUserTo(reqUuid);
              break;
          }
          break;
        default:
          // User forbidden
          console.log('not recognized')
          res.status(403).json({ message: "Forbidden to all" });
      }
    } else {
      console.log('no role')
      res.status(403).json({ message: "Forbidden" });
    }
  };
};

module.exports = permit;
