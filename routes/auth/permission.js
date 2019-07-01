// middleware for doing role-based permissions
const permit = (...allowed) => {
  const isAllowed = role => allowed.indexOf(role) > -1;
  // return a middleware
  return (req, res, next) => {

		const isUserEqualTo = (paramId) => {
			(paramId !== undefined && req.tokenUuid === paramId) ? next() : res.status(403).json({ message: "Forbidden to drivers" });
		}

		const reqUuid = req.uuid;
    const paramsUuid = req.params.uuid

    // Testing uuid match
    console.log("Token uuid: " + req.tokenUuid)
    reqUuid === undefined ? console.log("Requested uuid: " + paramsUuid) : console.log("Requested uuid: " + reqUuid);

    // If a role is passed in an argument, it's allowed to proceed
    if (isAllowed(req.role.name)) {
      switch (req.role.name) {
        // When the role is admin
        // If admins is allowed then it always pass
        case "admin":
          // Role is allowed, so continue on to the next middleware
          next();
          break;
        // When the role is driver or enterprise
        case "driver" || "enterprise":
          // Checks if there is an id parameters since drivers can only take actions that concern themselves
          // If so, the parameter needs to also be equals to the current users ID
					if (req.baseUrl === "/users") {
            isUserEqualTo(paramsUuid);
					} else {
						isUserEqualTo(reqUuid)
          }
          break;
        default:
          // User forbidden
          res.status(403).json({ message: "Forbidden to all" });
      }
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  };
};

module.exports = permit;
