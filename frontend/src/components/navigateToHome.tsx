import { useNavigate } from "react-router-dom";
const NavigateToHome = () => {

    const navigate = useNavigate()

    function handleClick() {

        navigate('/');
    }

    return (
        <button onClick={handleClick}>Home</button>)
}

export default NavigateToHome