const fs = require('fs')
const path = require('path')
const {NodeSSH} = require('node-ssh')

const ssh = new NodeSSH()

async function main() {
    await ssh.connect({
        host: '192.168.88.10',
        username: 'esarmien',
        password: 'one % in2 two',
        tryKeyboard: true,
      });
    const result = await ssh.execCommand('ls');
    console.log(result.stdout);
}

 main();