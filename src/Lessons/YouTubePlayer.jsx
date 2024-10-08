/* eslint-disable react/prop-types */


const YouTubePlayer = ({ url }) => {
    if (!url) return null;

    const videoId = new URL(url).searchParams.get('v');
    if (!videoId) return <p>Invalid YouTube URL</p>;

    return (
        <div className="youtube-player">
            <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default YouTubePlayer;