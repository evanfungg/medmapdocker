'use client'
import React, { useState } from 'react';
import './style.css';
import NavBar from "../components/NavBar.js"

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [clientSearchQuery, setClientSearchQuery] = useState('');
    const [clientSearchResult, setClientSearchResult] = useState('');

    const handleWebSearchSubmit = async (event) => {
        event.preventDefault();
        alert("Retrieving brand name: please wait");

        const response = await fetch(process.env.NEXT_PUBLIC_BRAND_NAME, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ searchQuery: searchQuery }),
        });

        const data = await response.json();
        setSearchResult(data.text);
    };

    const handleClientSearchSubmit = async (event) => {
        event.preventDefault();
        alert("Retrieving generic name (scientific) : please wait");

        
        const clientSearchResponse = await fetch(NEXT_PUBLIC_GENERIC_NAME, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ clientSearchQuery: clientSearchQuery }),
        });

        const clientSearchData = await clientSearchResponse.json();
        setClientSearchResult(clientSearchData.text);
    };


    return (
        <main className="main-search">
            <NavBar></NavBar>
            <h3 className="title">Medication Search</h3> 
            <form className="form-container" onSubmit={handleWebSearchSubmit}>
            <img src="https://as2.ftcdn.net/v2/jpg/03/95/44/63/1000_F_395446381_K3EettzZKGvCWlUSGM8GfzRvCkoXNOgX.jpg" alt="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Pill_1.jpg/1200px-Pill_1.jpg" className="image" id="ASA"/>
                <input
                    type="text"
                    placeholder="Enter Generic (Scientific) Name of Medication (eg. Ibuprofen)"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    
                    value={searchQuery}
                />
                
                    <button className="submit" type="submit">Search</button>
                    <img src="https://www.cancer.gov/sites/g/files/xnrzdm211/files/styles/cgov_article/public/cgov_image/media_image/2021-01/iStock-458563393.jpg" className="image" id="aspirin"/>
                
            </form>
            <div className="search-result">{searchResult}</div> 
            

            
            <form className="form-container" onSubmit={handleClientSearchSubmit}>
            <img src="https://www.duffystric.com/var/images/product/500.500/D/4614-01.jpg" alt="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Pill_1.jpg/1200px-Pill_1.jpg" className="image" id="advil"/>
                <input
                    type="text"
                    placeholder="Enter Brand Name of Medication (eg. Advil)"
                    onChange={(e) => setClientSearchQuery(e.target.value)}
                    value={clientSearchQuery}
                />
                
                    <button className="submit" type="submit">Search</button>
                    <img src="https://www.researchgate.net/profile/Murad-Abualhasan/publication/270283844/figure/fig1/AS:613968762642434@1523392968418/Chemical-structure-of-Ibuprofen.png" alt="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Pill_1.jpg/1200px-Pill_1.jpg" className="image" id="ibu"/>
                
            </form>
            <div className="search-result2">{clientSearchResult}</div>
            
        </main>
    );
}
