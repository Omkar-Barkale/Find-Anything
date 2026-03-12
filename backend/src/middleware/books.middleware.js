
export function bookMiddleware(req,res,next){

    console.log("Running book middleware");
    next();
}