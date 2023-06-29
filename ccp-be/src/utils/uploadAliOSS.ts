import OSS from "ali-oss";
import { ALI_KEY_ID, ALI_KEY_SECRET, ALI_BUCKET } from "../config/myAliConf";
import path from "path";

export const client = new OSS({
  region: "oss-cn-shenzhen",
  accessKeyId: ALI_KEY_ID,
  accessKeySecret: ALI_KEY_SECRET,
  secure: true,
  bucket: ALI_BUCKET,
});

const headers = {
  // 指定Object的存储类型。
  "x-oss-storage-class": "Standard",
  // 指定Object的访问权限。
  "x-oss-object-acl": "private",
  // 通过文件URL访问文件时，指定以附件形式下载文件，下载后的文件名称定义为example.jpg。
  // 'Content-Disposition': 'attachment; filename="example.jpg"'
  // 设置Object的标签，可同时设置多个标签。
  // "x-oss-tagging": "Tag1=1&Tag2=2",
  // 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
  "x-oss-forbid-overwrite": "false",
};

export async function put(name: string, buffer: Buffer) {
  const result = await client.put(
    `ccp/${name}`,
    buffer,
    { headers }
  );
  // console.log(result.url);
  return result.url;
}
