import React from "react"
import { Playfair_Display, Source_Serif_4 as Source_Serif_Pro } from "next/font/google"
import { Separator } from "@/components/ui/separator"

const playfair = Playfair_Display({ subsets: ["latin"] })
const sourceSerif = Source_Serif_Pro({ subsets: ["latin"], weight: ["400", "700"] })

export default function Home() {
  return (
    <div className={`${sourceSerif.className} min-h-screen bg-old-paper text-gray-800`}>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center border-b-2 border-gray-800 pb-6 mb-8">
          <h1 className={`${playfair.className} text-6xl mb-2 font-bold`}>The Daily Chronicle</h1>
          <div className="flex items-center justify-center mb-4">
            <Separator className="w-1/4" />
            <p className="italic mx-4">May 15, 1885</p>
            <Separator className="w-1/4" />
          </div>
          <p className="text-sm">Vol. XXIII, No. 142 - Price: Two Pence</p>
        </header>

        <main className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 pr-0 md:pr-4 border-r border-gray-400">
            <Article
              title="The Marvels of the Telegraph"
              content={`
                <p className="first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2">In this modern age of wonders, none is more astounding than the telegraph. This miraculous invention allows messages to be sent across vast distances in the blink of an eye...</p>
                <p>The telegraph has revolutionized communication, bringing news from far-flung corners of the globe to our very doorstep. It has shrunk the world, making it possible for businessmen to conduct transactions across oceans and for families to stay in touch despite being separated by thousands of miles.</p>
                <p>As we stand on the brink of a new century, one can only wonder what further marvels await us. Will we one day be able to transmit our very voices across these wires? Only time will tell.</p>
              `}
            />
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-4">
            <Article
              title="The Great Exhibition: A Triumph of Industry"
              content={`
                <p className="first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2">The Great Exhibition, held in the Crystal Palace, has drawn to a close, leaving all who attended in awe of the technological prowess of our great nation...</p>
                <p>From steam engines to printing presses, from textiles to telescopes, the Exhibition showcased the very best of British ingenuity and craftsmanship. Visitors from all corners of the Empire marveled at the displays, each more wondrous than the last.</p>
                <p>The success of the Exhibition serves as a testament to the power of human innovation and the bright future that lies ahead for our industrial nation. We eagerly anticipate the next such gathering of minds and machines.</p>
              `}
            />
            <Article
              title="The Debate on Women's Suffrage"
              content={`
                <p className="first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2">A growing movement calling for women's right to vote has been gaining traction in recent months. Proponents argue that women, being equally affected by the laws of the land, should have an equal say in their making...</p>
                <p>Critics of the movement claim that women lack the education and worldly experience necessary to make informed political decisions. They argue that the fairer sex is better suited to the domestic sphere, leaving matters of governance to their husbands and fathers.</p>
                <p>As the debate rages on, it remains to be seen whether this radical idea will gain enough support to effect real change in our society. Whatever the outcome, it is clear that the question of women's suffrage will continue to be a contentious issue for years to come.</p>
              `}
            />
          </div>
        </main>
      </div>
    </div>
  )
}

interface ArticleProps {
  title: string
  content: string
}

function Article({ title, content }: ArticleProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  return (
    <article className="mb-8 pb-8 border-b border-gray-400 last:border-b-0">
      <h2 className={`${playfair.className} text-3xl mb-4 font-bold`}>{title}</h2>
      <div className="content text-justify leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: isExpanded ? content : content.split("</p>")[0] + "</p>" }} />
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="italic text-gray-600 hover:text-gray-800 mt-2 cursor-pointer underline"
          >
            Read more
          </button>
        )}
      </div>
    </article>
  )
}

