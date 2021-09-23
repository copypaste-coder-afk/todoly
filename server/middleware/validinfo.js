    const validity = (req, res, next) => {
    const { name, email, password, security_question, answer } = req.body;
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/auth/register") {
      console.log(!email.length);
      console.log([name, email, password, security_question, answer].every(Boolean));
      if (![name, email, password, security_question, answer].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }
    } 
    else if (req.path === "/auth/login") {
      if (![email, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }
    }
  
    next();
  };

  module.exports = validity;