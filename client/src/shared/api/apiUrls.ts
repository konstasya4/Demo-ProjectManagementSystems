const apiUrls = {
  issues: {
    main: '/tasks',
    allIssues: () => apiUrls.issues.main,
    createIssue:()=> apiUrls.issues.main + '/create',
    updateIssue:(taskId:number)=> apiUrls.issues.main + `/update/${taskId}`,
    updateStatusIssue:(taskId:number)=> apiUrls.issues.main + `/updateStatus/${taskId}`,
    itemIssue:(taskId:number)=>apiUrls.issues.main + `/${taskId}`,
  },
  boards: {
    main: '/boards',
    allBoards: () => apiUrls.boards.main,
    itemBoard: (boardId:number)=>apiUrls.boards.main+`/${boardId}`
    },
    teams:{
      main:'/teams',
      allTeams:()=>apiUrls.teams.main,
      itemTeam:(teamId:number)=>apiUrls.teams.main+`/${teamId}`
    },
    users:{
      main:'/users',
      allUsers:()=>apiUrls.users.main
    },
}

export default apiUrls
