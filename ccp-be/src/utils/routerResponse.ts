import { Context, Next } from "koa";

/** 统一返回格式的中间件 */
export default async function routerResponse(ctx: Context, next: Next) {
  const res = await next();

  ctx.info(`请求参数: ${JSON.stringify(ctx.request.body)}`);
  ctx.info(`请求结果: ${JSON.stringify(res)}`);

  if (!res && ctx.status === 200) {
    ctx.status = 204;
  }

  ctx.body = {
    code: 20000,
    data: res,
  };
  
  if(ctx.status >= 400) {
    ctx.body = {
      code: ctx.status * 100,
      message: `请求失败，状态码为 ${ctx.status}`,
    };
    ctx.status = 200;
  }

  // if (ctx.status === 200 || ctx.status === 204) {
  //   ctx.body = {
  //     code: 20000,
  //     data: res,
  //   };
  // } else {
  //   ctx.body = {
  //     code: ctx.status * 100,
  //     message: `请求失败，状态码为 ${ctx.status}`,
  //   };
  //   ctx.status = 200;
  // }
  // console.dir(ctx.body, { depth: null }); // 以递归的形式打印对象
  // ctx.info(`请求结果: ${JSON.stringify(ctx.body)}`);
}
