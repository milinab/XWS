using user_service.Service.Interface;

namespace user_service.Authorization
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IUserService userService, IJwtUtils jwtUtils)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            Guid? userId = jwtUtils.ValidateToken(token); // Make sure userId is a Guid or Guid?

            if (userId != null)
            {
                context.Items["User"] = await userService.GetByIdAsync(userId.Value); // Use userId.Value if needed
            }

            await _next(context);
        }
    }
}