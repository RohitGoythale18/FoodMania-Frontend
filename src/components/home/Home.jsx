const Home = () => {
    return (
        <>
            <div className="h-screen bg-center bg-cover filter brightness-75 z-10 sm:h-96 md:h-screen" style={{ backgroundImage: 'url(/images/home-image.png)' }}>
                <div className="h-screen flex flex-col justify-center p-5">
                    <p className="text-white text-xl text-center m-5 md:text-2xl">
                        Welcome to Food Mania, your ultimate destination for exploring the rich and diverse world of Maharashtrian cuisine. We're passionate about the flavors, traditions, and culinary delights that Maharashtrian recipes have to offer. Our blog is a tribute to this incredible cuisine, and we're thrilled to take you on a mouth-watering journey through the land of Maharashtrian delicacies.
                    </p>
                    <p className="text-white text-xl text-center m-5 md:text-2xl">
                        As you step into Food Mania you'll be greeted by a tantalizing display of our featured Maharashtrian recipes. Each dish is carefully crafted, and the images are designed to make your taste buds tingle. Whether you're a seasoned cook or a newbie in the kitchen, there's something here to spark your culinary curiosity.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Home;