import { api } from '@/trpc/react'
 import { useLocalStorage } from "usehooks-ts"
 
 const useProject = () => {
    const {data: projects} = api.project.getProjects.useQuery()
    const [projectId, setProjectId] = useLocalStorage('outbreak','')
    const response = projects?.find(item => item.id === projectId)
    return {
        projects,
        response,
        projectId,
        setProjectId
    }
}
 
 export default useProject