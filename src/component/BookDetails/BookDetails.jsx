import { useState } from "react";
import { Link, useLoaderData, useParams } from "react-router";
import { addToStoredMarkedAsRead, addToStoredWishlist } from "../../utilites/addToDB";

export default function BookDetails() {
    const data = useLoaderData();
    const { bookId } = useParams();
    const id = parseInt(bookId);
    const book = data.find(book => book.bookId === id);
    // console.log(Object.keys(book).join(', '));
    const { bookName, author, image, review, totalPages, rating, category, tags, publisher, yearOfPublishing } = book;
    const [showFullReview, setShowFullReview] = useState(false);
    const maxLength = 100;
    const isLongReview = review.length > maxLength;

    const addToMarkedAsRead = (id) => {
        addToStoredMarkedAsRead(id)
    };
    const addToWishlist = (id) => {
        addToStoredWishlist(id);
    };

    return (
        <div className="space-y-2 md:space-y-4">
            <div className="breadcrumbs text-lg">
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </div>
            <div className="card flex flex-col md:flex-row h-full gap-2 md:gap-4 lg:gap-8 flex-grow">
                <figure className="md:w-1/2 w-full md:h-96 lg:h-full h-60 md:p-12 p-8 rounded-xl my-auto bg-gray-100">
                    <img
                        src={image}
                        alt={bookName} className="h-full rounded-xl object-contain" />
                </figure>
                <div className="md:w-1/2 mx-auto space-y-2 md:space-y-4">
                    <h2 className="card-title font-bold text-2xl md:text-3xl lg:text-4xl">{bookName}</h2>
                    <p>by: <span className="font-medium text-sm">{author}</span></p>
                    <div className="border border-y-2 border-x-0 border-gray-200">
                        <p className="py-2">{category}</p>
                    </div>

                    <div className="space-y-2 md:space-y-4">
                        <div className="space-y-1">
                            <p className="font-bold">
                                Review:
                                <span className="font-normal pl-2">
                                    {showFullReview || !isLongReview
                                        ? review
                                        : `${review.slice(0, maxLength)}...`}
                                </span>
                            </p>
                            {isLongReview && (
                                <button
                                    onClick={() => setShowFullReview(!showFullReview)}
                                    className="text-blue-500 font-medium hover:underline"
                                >
                                    {showFullReview ? "See Less" : "See More"}
                                </button>
                            )}
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                            {tags?.map((tag, idx) => (
                                <button key={idx} className="badge bg-green-50 text-green-500 p-4 border-none font-medium">
                                    #{tag}
                                </button>
                            ))}
                        </div>
                        <div className="border-t-2 border-gray-200"></div>
                        <div className="flex items-center">
                            <div className="space-y-1 md:space-y-2">
                                <p className="font-normal">Number of Pages:</p>
                                <p className="font-normal">Publisher:</p>
                                <p className="font-normal">Year of Publishing:</p>
                                <p className="font-normal">Rating:</p>
                            </div>
                            <div className="space-y-1 md:space-y-2">
                                <p className="font-bold pl-2 md:pl-12 lg:pl-24">{totalPages}</p>
                                <p className="font-bold pl-2 md:pl-12 lg:pl-24">{publisher}</p>
                                <p className="font-bold pl-2 md:pl-12 lg:pl-24">{yearOfPublishing}</p>
                                <p className="font-bold pl-2 md:pl-12 lg:pl-24">{rating}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 md:gap-4">
                            <button onClick={() => addToMarkedAsRead(id)} className="transition-all ease-linear duration-200 btn bg-transparent outline outline-1 border-none outline-green-400 hover:outline-none hover:bg-sky-500 hover:text-white"><i className="fa-solid fa-circle-check"></i> Mark as Read</button>
                            <button onClick={() => addToWishlist(id)} className="btn border-none bg-green-400 hover:bg-green-500 text-white transition-all ease-linear duration-200 w-fit"><i className="fa-solid fa-heart"></i> Add to Wishlist</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
