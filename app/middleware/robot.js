module.exports = (option, app) => {
    return async function robotMiddleware(ctx, next) {
        const source = ctx.get('user-agent') || '';
        const match = option.ua.some((ua) => ua.test(source));
        if(match) {
            ctx.status = 403;
          ctx.message = 'Go away, robot.';
          console.log('xxx')
        }else{
            await next();
        }
    };
};

exports.middleware =['robot'];
exports.robot = {
    ua:[/Baiduspider/i]
}