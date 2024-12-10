import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const GoogleCallback = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [user, setUser] = useState(null);
    const location = useLocation();
    // On page load, we take "search" parameters 
    // and proxy them to /api/auth/callback on our Laravel API

    
    useEffect(() => {
        let isMounted = true;
        console.log(location);
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/v1/auth/socials/callback${location.search}&provider=google`, {
                    headers : {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data)
                if (isMounted) {
                    setData(data);
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
        return () => {
            isMounted = false;
        }
    }, []);
    // Helper method to fetch User data for authenticated user
    // Watch out for "Authorization" header that is added to this call
    function fetchUserData():any {
        fetch(`http://localhost:8000/api/user`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + data.access_token ,
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setUser(data);
            });
    }
    if (loading) {
        return <DisplayLoading/>
    } else {
        if (user != null) {
            return <DisplayData data={user}/>
        } else {
            return (
                <div>
                    <DisplayData data={data}/>
                    <div style={{marginTop:10}}>
                        <button onClick={fetchUserData}>Fetch User</button>
                    </div>
                </div>
            );
        }
    }
}
function DisplayLoading() {
    return <div>Loading....</div>;
}
function DisplayData(data) {
    return (
        <div>
            <samp>{JSON.stringify(data, null, 2)}</samp>
        </div>
    );
}


export default GoogleCallback