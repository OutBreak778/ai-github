import React from 'react'
import { gitCommitHashes, pullCommits } from "@/lib/github";
import { githubLoader } from '@/lib/github-loader';
 
const Qpage = async () => {
  const githubUrl = `https://github.com/docker/genai-stack`;
    const data = await gitCommitHashes(githubUrl)
    const commit = await pullCommits('cm478v6vp0003m3kl94dsytow')
    // console.log(commit,data,"also")
    const loader = await githubLoader('https://github.com/docker/genai-stack')
    console.log(loader, "Loader")
  return (
    <div>

    </div>
  )
}

export default Qpage