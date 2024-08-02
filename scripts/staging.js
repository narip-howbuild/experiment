import {Octokit} from "@octokit/rest";
import {execSync} from "child_process";


// octokit instance 생성
const octokit = new Octokit();

/** 현재 로컬 브랜치의 이름을 가져오는 함수 */
const getLocalBranchName = () => {
    return execSync('git branch --show-current').toString().trim();
}

/** staging 브랜치 이름을 만드는 함수 */
const getStagingBranchName = () => {
    const localBranchName = getLocalBranchName()
    const modified = localBranchName.toLowerCase().replaceAll('/', '-') // url 규칙에 맞게 수정
    return `staging-${modified}`;
}

/** 원격지에 특정 브랜치가 존재하는 확인하는 함수 */
const checkRemoteBranchExists = async (branchName) => {
    const remoteUrl = execSync('git config --get remote.origin.url').toString().trim();
    const match = remoteUrl.match(/github\.com[:/](.+?)\/(.+?)\.git$/);
    const owner = match[1];
    const repo = match[2];

    try {
        const res = await octokit.repos.getBranch({
            owner,
            repo,
            branch: branchName
        }) // github api 사용

        console.log('success, get Remote Branch')

       return res.data.name === branchName
    } catch (e) {
        console.log(e)
        console.log('fail to get Remote Branch')
        return false
    }
} // 에러나거나 res 가 없으면 false, 있으면 true

/** staging 브랜치를 생성하는 함수 */
const createBranch =  (branchName) => {
    const hasLocalStagingBranch = execSync('git branch -l').includes(branchName);
    if(!hasLocalStagingBranch) {
        execSync(`git branch ${branchName}`);
    }
    execSync(`git push origin ${branchName}`);
}


(async () => {
    const dd = execSync('git branch -l staging-test').includes('staging-test')
    console.log('@', dd)
    const localBranchName = getLocalBranchName()
    const stagingBranchName = getStagingBranchName()
    const hasRemoteStagingBranch = await checkRemoteBranchExists(stagingBranchName)

    if(!hasRemoteStagingBranch) {
        // staging 브랜치가 없는 경우 > create branch and push
        createBranch(stagingBranchName)
    }
    console.log(localBranchName, stagingBranchName)
})()
// 현재 브랜치 정보를 가져오는 함수


// **모듈**
//
// 1. staging 브랜치 이름을 만드는 함수 : ok
// - 현재 브랜치 정보 가져와야함(github)
// 2. staging 브랜치가 리모트에 존재하는지 확인하는 함수 (github)
// 3. 브랜치를 생성, 삭제, push 하는 함수 (github)
// 4. env 추가, 삭제하는 함수 (vercel)
// 5. build & deploy