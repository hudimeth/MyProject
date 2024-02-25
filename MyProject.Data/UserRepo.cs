using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Data
{
    public class UserRepo
    {
        private readonly string _connectionString;
        public UserRepo(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddUser(User user, string password)
        {
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(password);
            user.PasswordHash = passwordHash;
            using var ctx = new MyProjectDbContext(_connectionString);
            ctx.Users.Add(user);
            ctx.SaveChanges();
        }
        public User Login(string email, string password)
        {
            var user = GetByEmail(email);
            if(user == null)
            {
                return null;
            }
            var isValidPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!isValidPassword)
            {
                return null;
            }
            return user;

        }
        public User GetByEmail(string email)
        {
            using var ctx = new MyProjectDbContext(_connectionString);
            return ctx.Users.FirstOrDefault(u => u.Email == email);
        }
        public bool UserExistsForThisEmail(string email)
        {
            using var ctx = new MyProjectDbContext(_connectionString);
            return ctx.Users.Any(u => u.Email == email);
        }
    }
}
