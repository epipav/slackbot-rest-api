/* we can authorize certain  certain user roles to desired endpoints using this middleware. */

export  function giveAccess(...allowed) {
    return (req,res,next)=>{
        const isAllowed = allowed.indexOf(res.locals.userRole) > -1;
        if(isAllowed)
        {
            next();
        }
        else{
            return res.status(403).send({
                message: 'Authorization failed'
            });
        }

   
    }
   
}