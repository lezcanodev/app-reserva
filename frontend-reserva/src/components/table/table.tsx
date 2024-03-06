import  { ReactNode } from 'react'


export interface TableProps{
    columnsName: string[];
    children: ReactNode
}


Table.Row = ({children, ...props}: { children: ReactNode, [key: string]: any  }) => <tr className="border-b border-b-primary/10" {...props}>{children}</tr>
Table.Data = ({children, ...props}: {children: ReactNode, [key: string]: any }) => (
    <td className={`text-center py-3`} {...props}>{children}</td>
)

export function Table({columnsName, children}: TableProps){
    return (
        <table className="w-full text-sm">
            <thead className="text-xs uppercase text-primary-contrast  bg-primary text-center ">
                <tr>
                    {columnsName.map((columnName, index) => (
                        <th className="px-1 py-2" key={`${columnName}${index}`}>{columnName}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                    {children}              
            </tbody>
        </table>
    )
}