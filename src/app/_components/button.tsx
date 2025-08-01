import Link from "next/link";

type button = {
        type: "submit" | "reset" | "button",
        name:string
}

export { ButtonBack, Button };

const ButtonBack = (url: string) => {
        return (
                <div className="flex justify-around mt-9">
        <Link className="w-30" color="primary" href="/posts">
                <span className="text-lg">Back</span>
        </Link>
        <Link className="w-40" color="primary" target="blank" href={url}>
                <span className="text-lg">Continues Read</span>
        </Link>
        </div>
        );
}

const Button = ({type,name}:button) => {
        return (
                <button type={type} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{name}</button>
        );
}