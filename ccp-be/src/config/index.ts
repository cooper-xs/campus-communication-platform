export const TOKEN_CONF = {
  secretToken:
    "4dffab4b7302739598ad0207f9fb76e7ab69ce3f54fd5adddf7d208825f12a2f",
  secretKey: "access-token",
  expiresIn: "2h",
};

// 从环境变量中获取配置值
const host = process.env.DB_HOST || "localhost";
// const port = process.env.DB_PORT || 3306;
const port = Number(process.env.DB_PORT) || 3306;
const username = process.env.DB_USERNAME || "root";
const password = process.env.DB_PASSWORD || "root";
const database = process.env.DB_DATABASE || "ccp";
// const synchronize = process.env.DB_SYNCHRONIZE || false;
const synchronize = Boolean(process.env.DB_SYNCHRONIZE) || false;

// 导出数据库配置对象
export const DATASOURCE = {
  host,
  port,
  username,
  password,
  database,
  synchronize,
};
