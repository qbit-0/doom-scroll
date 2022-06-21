import { SentimentBanner } from "./SentimentBanner";

export const PostPlaceholder = () => {
    return (
        <section className="flex overflow-hidden max-w-7xl h-96 mx-auto mb-8 border-t-2 border-l-2 border-gray-800 rounded-tl-2xl bg-gradient-to-r from-gray-800 to-gray-900">
          <SentimentBanner score={null} />
        </section>
      );
}