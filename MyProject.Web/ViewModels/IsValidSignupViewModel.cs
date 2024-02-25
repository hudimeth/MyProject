namespace MyProject.Web.ViewModels
{
    public class IsValidSignupViewModel
    {
        public bool UserExistsForThisEmail { get; set; }
        public bool PasswordsMatch { get; set; }
    }
}
