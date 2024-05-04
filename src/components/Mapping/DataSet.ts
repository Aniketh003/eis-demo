export interface apiConfigurationProps{
    value:string,
    url:string,
    method:string,
    body:any,
    needsLoop:boolean,
    hasVariables:boolean
}

export const apiConfigurations = [
    {
        value:"dmsMapping",
        url:"/dealerStores/dmsNonDmsMapping",
        method:"POST",
        body:null,
        needsLoop:true,
        hasVariables:false,
    },
    {
        value:"mapDepartments",
        url:"/dealerStores/${variable}/storeDepartmentMapping",
        method:"PUT",
        body:null,
        needsLoop:false,
        hasVariables:true,
    }
]