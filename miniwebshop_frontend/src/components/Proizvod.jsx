import React from "react"

export const Proizvod = ({id, naziv, opis, cijena, kolicina, brand_id}) => {
    return (
        <tr>
            <th>{id}</th>
            <th>{naziv}</th>
            <th>{opis}</th>
            <th>{cijena}</th>
            <th>{kolicina}</th>
            <th>{brand_id}</th>
        </tr>
    );
};