//Ideally to put this to some saga
import { useState, useEffect } from 'react';
import axios from 'axios';

const useDataApi = (initialUrl, initialData) => {
    const [data, setData] = useState(initialData);
    const [url, setUrl] = useState(initialUrl);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const resultArtist = await axios(`https://api.discogs.com/database/search?q=${url}&type=artist&token=aposIVWgHoYKOcWGiGimdOFusCIUFnADCBGnsdEW`);
                const result = await axios(`https://api.discogs.com/artists/${resultArtist.data.results[0].id}/releases?sort=year`);
                setData(result.data);
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };

        fetchData();
    }, [url]);

    return [{ data, isLoading, isError }, setUrl];
};
export default useDataApi;