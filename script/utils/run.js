/*
 * @Author: hzm
 * @Date: 2022-08-31 13:15:13
 * @Description: 
 */
const { spawn } = require("child_process");
// module.exports =  async (command, path) => {
//     //cmd表示命令，args代表参数，如 rm -rf  rm就是命令，-rf就为参数
//     const [cmd, ...args] = command.split(' ')
//     return new Promise((resolve, reject) => {
//         const app = spawn(cmd, args, {
//             cwd: path,//执行命令的路径
//             stdio: 'inherit', //输出共享给父进程
//             shell: true //mac不需要开启，windows下git base需要开启支持
//         })
//         //执行完毕关闭并resolve
//         app.on('close', resolve)
//     })
// }



module.exports = async (command, cwd) =>
  new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(" ");
    console.log(`run: ${cmd} ${args.join(" ")}`, process.platform, cwd);
    const app = spawn(cmd, args, {
      cwd,
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    const onProcessExit = () => app.kill("SIGHUP");

    app.on("close", (code) => {
      process.removeListener("exit", onProcessExit);

      if (code === 0) resolve();
      else
        reject(
          new Error(`Command failed. \n Command: ${command} \n Code: ${code}`)
        );
    });
    process.on("exit", onProcessExit);
  });