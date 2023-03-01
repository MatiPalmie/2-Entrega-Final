import { Router } from "express";

const router = Router();

const isSession = (req,res,next)=>{
    if(req.session.user){
        return res.redirect('/profile')
    }
}

router.get("/login",isSession, (req, res) => {
  res.render("login");
});
router.get("/register",isSession, (req, res) => {
  res.render("register");
});
router.get("/profile", (req, res) => {
  if(!req.session.user){
    return res.redirect('/login')
  }
  res.render("profile");
});

export default router;
