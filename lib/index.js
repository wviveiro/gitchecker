const exec = async (path) => {

    if (!path) {
        return console.log('ERROR: No path');
    }

    const fs = require('fs');
    const files = fs.readdirSync(path);

    if (!files || files.length === 0) {
        return console.log('ERROR: files not found');
    }

    const git = require('simple-git/promise');
    let f;
    for (let i = 0; i < files.length; i++) {
        f = files[i];
        const tpath = `${path}/${f}`;
        if (fs.lstatSync(tpath).isDirectory()) {
            try {
                // Check if there is a .git inside
                if (await fs.existsSync(`${tpath}/.git`)) {
                    const g = await git(tpath).status();
                    if (g.not_added.length > 0 ||
                        g.conflicted.length > 0 ||
                        g.created.length > 0 ||
                        g.deleted.length > 0 ||
                        g.modified.length > 0 ||
                        g.renamed.length > 0 ||
                        g.files.length > 0 ||
                        g.staged.length > 0 ||
                        g.ahead > 0 ||
                        g.behind > 0) {
                            console.log(f, ' HAS CHANGES');
                        }
                } 

                // const g = await git(tpath).status();
                // console.log(g);
            } catch (e) {
                console.log('ERROR: ', e);
            }
        }
    }

}


exports.exec = exec;