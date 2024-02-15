import { useState } from 'react';

const url = import.meta.env.VITE_URL_EMAIL;

const useForm = ( initialData, onValidate) => {

    const [ form, setForm ] = useState(initialData );
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState({});

    const handleChange = (e) => {

        const { name, value } = e.target;
        setForm({...form, [name]: value})

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        const error = onValidate(form);

        console.log(Object.keys(error).length)

        if(Object.keys(error).length === 0 ) {
            setLoading(true);
            fetch(`https://formsubmit.co/ajax/${url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(form)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                data.success === "true" && setForm(initialData);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
        } 
        setErrors(error);
    }

  return { form, loading, errors, handleChange, handleSubmit }
}

export default useForm;