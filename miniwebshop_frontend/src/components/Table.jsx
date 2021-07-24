import React from "react"

export const Table = ({children}) =>{
    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Naziv</th>
                    <th>Opis</th>
                    <th>Cijena</th>
                    <th>Količina</th>
                    <th>Brand Id</th>
                </tr>
            </thead>

            <tbody>{children}</tbody>
        </table>
    )
}