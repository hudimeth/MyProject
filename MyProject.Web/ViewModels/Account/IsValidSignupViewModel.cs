namespace MyProject.Web.ViewModels.Account
{
    public class IsValidSignupViewModel
    {
        public bool UserExistsForThisEmail { get; set; }
        public bool PasswordsMatch { get; set; }
    }
}
