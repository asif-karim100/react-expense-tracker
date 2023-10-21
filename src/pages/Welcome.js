import { Link } from "react-router-dom";

const Welcome = () => {
    return(
        <div>
        <h1>Welcome to Expense Tracker</h1>
        <div>
            <span> Your Profile is incomplete</span>
            <Link to="/profile">Complete Now</Link>
        </div>
        </div>
    )
};


export default Welcome;