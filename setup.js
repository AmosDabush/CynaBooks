const { exec } = require("child_process");

const installDependencies = (dir) => {
  console.log(`Installing dependencies in ${dir}...`);
  exec(`cd ${dir} && npm install`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error installing dependencies in ${dir}: ${err}`);
      return;
    }
    console.log(`${dir}: ${stdout}`);
    console.error(`${dir}: ${stderr}`);
  });
};

installDependencies("cynabooks-ui");
installDependencies("cynabooks-api");
