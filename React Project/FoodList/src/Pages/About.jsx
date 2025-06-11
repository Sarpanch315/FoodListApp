import { NavLink } from "react-router";

export default function About () {
    return (
    <>
    <div className=" h-[75vh] flex flex-row">
        <div className="mt-56 ml-24">
        <section className="flex-1 bg-transparent ">
        <p className="bg-green-700 text-2xl text-white rounded">Eat better Feel better </p>
        <h3 className="mt-2 mb-1 text-4xl font-normal">Welcome to Our Kitchen</h3>
        <h1 className=" text-3xl font-bold">Discover Your New Favourite.</h1><br />
        <h4 className="text-xl">My Profiles</h4>
        <br />
        <div>
            <span className="bg-blue-600 text-white font-bold p-2 mr-5 rounded"><NavLink to="https://in.linkedin.com/in/govind-sikarwar-698735217">➜linkdin</NavLink> </span>
            <span className="bg-gray-500 text-white font-bold p-2 mr-5 rounded"><NavLink to="https://github.com/Sarpanch315">➜Github</NavLink> </span>
            <span className="bg-orange-500 text-white font-bold p-2 mr-5 rounded"><NavLink to = "https://leetcode.com/u/sarpanch315/">➜LeetCode</NavLink></span>
        </div>

        </section>
        </div>
    
    <section className="flex-1 bg-transparent">
        <div className="mt-24 ml-80">
        <img  src="https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=" alt="sandwitch" />

        </div>
    </section>
    </div>
    
      
    </>
    )
}