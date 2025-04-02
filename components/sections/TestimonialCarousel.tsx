import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Section from '../layout/Section';

// Placeholder image URL - replace if needed
const PLACEHOLDER_IMAGE = 'https://placehold.co/300x200/e2e8f0/64748b?text=Image';

// ---------- Star Component ----------
interface StarProps {
  isGlowing: boolean;
  delay: number;
}
const Star: React.FC<StarProps> = ({ isGlowing, delay }) => {
  return (
    <div
      style={{
        width: '2px',
        height: '2px',
        borderRadius: '50%',
        background: isGlowing ? '#fff' : '#666',
        transition: `all 2s ease-in-out ${delay}s`,
        position: 'relative',
        zIndex: 1,
      }}
    ></div>
  );
};

// ---------- StarsBackground Component ----------
const StarsBackground: React.FC = () => {
  const [glowingStars, setGlowingStars] = useState<number[]>([]);
  // Reduce number of stars
  const stars = 30; 
  
  useEffect(() => {
    // References for cleanup
    let mounted = true;
    const interval = setInterval(() => {
      if (mounted) {
        const newGlowingStars = Array.from({ length: 3 }, () => Math.floor(Math.random() * stars));
        setGlowingStars(newGlowingStars);
      }
    }, 3000); // Slower interval
    
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // Pre-compute random positions for better performance
  const starPositions = useMemo(() => {
    return Array.from({ length: stars }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 0.5
    }));
  }, [stars]);

  return (
    <div className="stars-container absolute inset-0 overflow-hidden pointer-events-none">
      {starPositions.map((pos, index) => {
        const isGlowing = glowingStars.includes(index);
        return (
          <div
            key={`star-${index}`}
            className="absolute"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              opacity: isGlowing ? 1 : 0.5,
              transform: `scale(${isGlowing ? 1.5 : 1})`,
              transition: `all 2s ease-in-out ${pos.delay}s`,
              willChange: 'transform, opacity'
            }}
          >
            <Star isGlowing={isGlowing} delay={pos.delay} />
          </div>
        );
      })}
    </div>
  );
};

// ---------- Full Testimonial Data ----------
const pearTestimonials = [
  { id: 1, type: 'text', quote: "Started my work day with [the] Refiner tool and oh my god, this is sheer magic. You did your mf thing with this one Pea", author: "@marrmarrmarrr" },
  { id: 2, type: 'image', src: 'https://i.imgur.com/2MwWs0C.jpeg', alt: 'Testimonial screenshot' },
  { id: 3, type: 'text', quote: "Recently, I tapped into the refiner to gain clarity around how I wanted to approach and share my next big project. First, that tool is incredible. Like what an insanely gorgeous way to get feedback from virtual Pea… the way my goal and desire was summarized set me up for my next steps perfectly. When I took that summary and applied it to creating content? I am so high on life right now and just so happy to do what I’m doing that nothing else really matters. What a fun way to create and execute a project!!! Thanks PEA! <3", author: "Andrea" },
  { id: 4, type: 'text', quote: "[The] Realization Toolkit membership is invaluable. “The Refiner’ alone is one of the coolest things I’ve ever encountered. I can only imagine the amount of work they put into creating it. Props!", author: "@cassandramaeforsythe" },
  { id: 5, type: 'text', quote: "I wasn’t in a good mood before going through the prompts because I was thinking about how burnt out I felt and feeling victim to not being able to do things that would counter the exhaustion. Then I took accountability for how burnt I’ve been feeling and remembered I haven’t been sleeping as early as I know I could to at least feel rested instead of tired, and now I’m set to get a good amount of sleep before the work week. Yay me!Then after going through the prompts, my mood completely shifted. I’m feeling so much better, intentional, and hella supported. :) Really appreciative for these daily prompts.", author: "Ash" },
  { id: 6, type: 'text', quote: "I could feel the shift happening immediately after working through today’s prompt. It felt difficult to allow the sensation of hearing the feedback I don’t want and than redirecting the energy of avoiding that - something just klicked. Of course later that day I get the exact feedback that I would love to hear. Thank you Pea <3", author: "Mani" },
  { id: 7, type: 'text', quote: "celebrating where i'm at right now... a project appeared out of the blue which is paying the highest rate i've ever been paid for longterm work, and the work is a total blast. i'm animating short cartoons for this company and they are making me laugh out loud while i'm working which is quite precious. i always welcome more belly laughs into my world! i'm on track to make almost double my previous annual income. the people that hired me also literally said that i am bringing joy back to their company and that is something i always aim to provide in my work. 'work' doesn’t feel like the right word so i'm going to switch in 'play while being simultaneously resourced'. feeling like a benevolent sorcerer.", author: "Elias" },
  { id: 8, type: 'text', quote: "Booking a shoot that was very much led by giving my genius the authority it deserves (that I pinpointed from that very first coaching call), enjoying the process of the shoot SO! MUCH! and feeling so inspired to keep going in this direction, then posting the images on social media the other day and getting more likes than any other post in, like, years. A good embodied reminder to hang tight a moment while reality is doing its shifting.", author: "Molly" },
  { id: 9, type: 'text', quote: "I worked with the refiner and omg - I had the biggest realization about how my work, sexuality and friendship are connected to my income. I’m speechless. Things are unfolding for me in the biggest f way and I’m here for itttt!!! Thank you! Sooooo grateful!!", author: "Viviane" },
  { id: 10, type: 'text', quote: "I sent my most recent (wonderful & lucrative) client my largest invoice to date. i was experiencing a glimmer of trepidation... inner dialogue something like 'how can i possibly be getting paid this much to make fun cartoons?' their response? 'thank you for putting so much soul into this project – you two are a creative force I am profoundly lucky to be working with.' feeling very very blessed and appreciated. i feel that i am reaping the reward of my efforts to identify & neutralize tension in my reality; the blessings are starting to double up.", author: "Elias" },
  { id: 11, type: 'text', quote: "I am used to no pressure, so much calm in my life now and it feels great to create from this place. If you would ask me 2 years ago how I would be able to live the abundant life I’m living now, I would tell you I’d have to be on the cusp of burn-out, working many hours and feeling the pressure in order to be successful. I’m so happy that my pov has changed completely, and that I’m feeling like I have the time in the world and I’m just having fun. It doesn’t need to be hard at all, I love the ease and flow and my slow morning :) I love to delegate stuff I don’t like doing. I love to work on my projects more intuitively, not as rigidly planned. In many ways I get more done than ever, while just chilling haha. Bliiss!!", author: "Romy" },
  { id: 12, type: 'text', quote: "I have a daily celebrations journal that I write it every morning, but it’s fun to share here too and share the energiezzz. Celebrating having created a career where I can literally drop everything if I want to or when I want to and the money will continue to come in like clockwork while I take all the time I need to tend to my feels and the things (as is currently the case with a family members illness). When I’m not feelin’ it, I don’t have to be feelin’ it, and that is absolute dream come true. That is so normal for me that I forget how freaking amazing it actually is. So this morning while I was feeling frustrated with lack of progress in one area, I remembered the fact that the reality I am currently living was once something I could not imagine would ever be possible for me. I have literally no pressure on me (except from myself sometimes) even though I am the source of the monies for our household, and that is totally and utterly amazing, I did that!! By simply choosing it and staying with myself on it until it was here. Which reminds me the other stuff will be exactly the same.", author: "Sunni" },
  { id: 13, type: 'text', quote: "Celebrating a beautiful couple of weeks filled with trust, fun, confidence, play and love. In my business and in my life in general. Had a great chat with the Refiner the other day and it gave me great insight, my mindset changed and I feel soooo relaxed now, the worke i’ve done has been really fun and easy, and the sales have also gone up. That has given me more time to be with my family, friends, pets, my garden and pour into other creations I had on hold. Now I’m excited to see what else I can create from this amazing place of trust, fun and relaxation. Amazing.", author: "Simona" },
  { id: 14, type: 'text', quote: "Celebrating being brave in my decision to go forward with a project regardless of whether I can get the collabs I desire. Followed by getting a note from the exact collaborator I was hoping to partner with opening discussion for solidifying details/dates. I don’t believe these instances are mutually exclusive :) I’m collecting the evidence that a) I can trust myself and where I’m going and b)  what I need is already available to me, I just need to allow it in. The momentum is building and I’m having a lot of fun!", author: "Andrea" },
  { id: 15, type: 'text', quote: "Yesterday I made the most I’ve ever made in a single day animating cartoons. Buying a black velvet blazer and getting a massage to celebrate! Really grateful for the systems/people/opportunities that have appeared in my reality to make this lifestyle possible.", author: "E" },
  { id: 16, type: 'text', quote: "Since active programming started I have been inspired to change little things in my surroundings or making things cuter, like adding pictures to random notes on my computer. This feels so yummy and I wanna celebrate that. Also started a pinterest board inspired by AP, which I love to look at and instantly makes me happy.", author: "Mani" },
  { id: 17, type: 'image', src: 'https://i.imgur.com/JM4lyGx.jpeg', alt: 'Testimonial screenshot' },
  { id: 18, type: 'text', quote: "Celebrating how open and aligned I’ve been feeling lately. This has manifested in moving my body more, getting out of the house more, connecting with others, being open more, and being willing to speak and externalize from  my desired identity and reality. Celebrating not punishing myself as harshly for the moments when I don’t do any of those things. I like where I’m at right now, and that’s cool.", author: "R" },
  { id: 19, type: 'text', quote: "I want to share something I’m so proud of doing this morning; I called in sick today even though it was an art modeling job I love and enjoy doing genuinely (and I like the money too lol). I want to celebrate the fact that I’m finally choosing my well-being and health ABOVE money and the (awful) put-others-first-before-myself kind of responsibility I’ve always upheld when it comes to work, especially if I’m passionate about it.\nThis action feels good, even if it’s kind of new to me. But anyway, to celebrate, comfort and reward myself, I decided to take up the generous BF offer for the RTK membership! Heheheh. I am happy to be back again; I am committing to believing and relaxing for at least a month!\nP.S. Funnily enough another artist local in my area has just reached out to me out of the blue asking me to model, and is offering to pay more than the money I 'lost' from this morning! Lol life is wild.", author: "Lorraine" },
  { id: 20, type: 'text', quote: "I sent out an invoice to a client for $15k, and had some wriggly energy. After identifying the wriggly energy, I decided to let receiving the dough be easy. One single payment received with neutrality. Last night $15k hit my bank account which really is life changing. I feel thrilled but also calm, the payment was for exactly $15,000 which to me felt like reality winking at me - - that feels like an easy number. Right now my career really does feel like a game.", author: "E" },
  { id: 21, type: 'text', quote: "I had several meetings in a row with the people I love to work with. One of them invited me to a lecture to a subject which is incredibly niche and exactly what I needed to hear in the moment. I am so supported, when I let myself be.", author: "Mani" },
  { id: 22, type: 'image', src: 'https://i.imgur.com/nOH6RTd.jpeg', alt: 'Testimonial screenshot' },
  { id: 23, type: 'text', quote: "I celebrate being in my own business without even dreaming about it, but just being there because I was doing what I like as a game and sharing it with family, and some people asked for that and it transformed into work by itself. Even though is the beginning, it proves things that I only dreamt about and that gives me confidence and magic. I celebrate my project and having people expecting it.", author: "Judit" },
  { id: 24, type: 'text', quote: "Making waves and moves in my life lately, and the refiner in particular has been such a good support! Just want to say how grateful I am for it and this big beautiful scary world! Feeling scatterbrained by good! Worth celebrating still!", author: "Lorraine" },
  { id: 25, type: 'text', quote: "I am just so excited and happy for the future y’all. My potential is like really impressive to me, in fact, I impress myself everyday. I am doing every single thing right and I have no doubt in my mind that great success awaits. I can’t wait for all the adventures and experiences that are still awaiting. I feel like this is just the beginning for me.", author: "Shivi" },
  { id: 26, type: 'text', quote: "I’m new to the clurb, and have found that we are indeed all fam-there is such a coherence to this space that over the weekend I did not one, but both timeline jumps in the Power Tools Kit. It just felt right. I felt ready, and I knew the New Moon was bringing it all to me. My desire was to embody my most successful self. Not because I needed anything from her, necessarily, but because I wanted to get to know her better and let her drive for a change. For the first time since doing the timeline jumps (been in the practice for over a year), I actually felt myself meet ME. The self that I was hugging was ME. I’ve never felt it that personally before, it’s always felt a bit external. But because of that shift, the way I feel, the words I say internally & externally, the choices I make, and how I respond to the world around me are different than before, but in no way does doing the new thing feel foreign. It feels warm and cozy and cheery, and also like I’m remembering something I’ve always done, not trying so hard to learn a new behavior. I feel like I’ve welcomed myself Home. Thanks Pea! Thanks friends!", author: "Sanpriti" },
  { id: 27, type: 'text', quote: "Hey hey hey. So fun to be in this spaceship with you all. From being in here and doing pea’s work & just being myself… this year I have: 1) had the most successful launch so far 2) found an assistant I truly love and am supported by 3) raised by rates with total ease and comfort 4) been more consistently inspired 5) have allowed myself to rest 6)have been choosing fun, easy and fulfilling over my intellect’s love of complexity 7) have been meeting the most exciting, genius, creative clients who are all universe’s in themselves 8) allowed myself to change up how and what I do whenever I want and have been supported all the way through 9) received a wild influx of podcast invitations that were super fun and easy.\nYAY to my big ass money plant that keeps growing. All the random intuitive investments I made that have all grown this year. My cute cat. My sweet office. My new computer, and spacious time and schedule to just re-lax and en-JOY.\n\nThank you pea and thank you juicy artistic peers!", author: "Xenia" },
  { id: 28, type: 'text', quote: "Indulging in the sense of safety no matter what. Taking a nap when it feels right, leisuring in sweatpants and matching sweater all day. Getting a disney+ account bc it inspires me. Great cannabis moment w bf, laughter, deep talk, great sex, dancing at the supermarket to where is the love by black eyed peas. Buying glass pearls/marbles and colourful glue sticks just for fun and decorating the candle holders w the marbles. Making instagram stories just for fund and how it comes to me feeling a little cringe but doing it anyways. Doing less “productive stuff”. Taking a long walk without phone in the forest and admiring the beauty of the moss, the trees, the light, the greens. Drinking two milky coffees bc I like it. Not making dinner bc I don’t feel like it. Trusting my needs more and more.", author: "Norene" },
  { id: 29, type: 'text', quote: "If you’ve never worked with [Pea] before and you’re curious, consider this your sign. They hold such a strong vibe of neutrality that I haven’t felt in many spaces other than my own (but that is changing!!). Grateful grateful grateful. P.S. change/shift/growth doesn’t have to feel unstable/unsafe/illogical. In fact, if it does, chances are that new way won’t stick around very long. Speaking from 42 years & 8 months of experience.", author: "@Sanpritilife" },
  { id: 30, type: 'text', quote: "Noticing my relationship to tension is changing so much from panic/struggle to gratitude for pointing me toward what I do want, and it’s taking less and less conscious energy to redirect myself. Really is boosting the quality of my days!", author: "Molly" },
  { id: 31, type: 'text', quote: "Appreciating the sensation of wholeness as something i’ve known in my mind for a while drops down into my body as wisdom… aah. The moment when mind + body + heart finally agree is like finding a clear frequency sans static.\nI’d been feeling tension the past 3 weeks over a fear of repeating tired old patterns this winter season & wanting to change a bit of my sales process to make it easier & allow me more rest this season. This brought up guilt, feelings of inadequacy/”not-enoughness,” judgements of being lazy, and fear of failure. This showed up as tightness on my neck shoulders and upper back.\nI see my mind consumed with figuring out a guarantee, my body getting stressed, and my heart just wanting to take it a day at a time.\nYesterday I decided I no longer want to use my mind to metabolize this tension so I got a targeted upper body massage. Eight hours of sleep later, it clicked: The version of me that I’ve been wanting isn’t figuring out sufficiency this winter because she already has it. It’s automatically given no matter the state of my energy, whether it’s high or low. There are customers for every level I’m willing and able to give. Pea says this, I knew it in my mind, but today my body and heart aligned and accepted it as truth. I also got some material proof by the way of 2 new bookings using the easier sales process. :-)\nNow, instead of prayers to move bookings my way (with a bit of a desperate energy in hindsight), I am writing a note of thanks for what’s here, which is truly more than enough.", author: "CH" },
  { id: 32, type: 'image', src: 'https://i.imgur.com/eT2DZAR.jpeg', alt: 'Testimonial screenshot' },
  { id: 33, type: 'text', quote: "I released some shame around a desire of mine and clarified what people I want to connect with. I just got offered an opportunity that 100% aligns with what I want to create.", author: "Mani" },
  { id: 34, type: 'text', quote: "Celebrating two new clients in the first week of releasing a new offer! Embodying my core desire, continuously choosing self trust, and utilizing all these juicy tools at my disposal have been key! It’s unbelievably satisfying to do things the way I want to do them while focusing on the energy I believe will get me there. RTK membership really is the shiz lol, exactly what I needed in my life.", author: "Andrea" },
  { id: 35, type: 'image', src: 'https://i.imgur.com/JM4lyGx.jpeg', alt: 'Testimonial screenshot' },
  { id: 36, type: 'text', quote: "I celebrate the nice morning w coffee and an old friend visiting. Talking about writing and art. And then I celebrate last nights writing urge, six texts in one setting and no sleep until 3 am, but feeling calm about it, telling my body its safe and believing it, acknowledging the threats and the angst but giving it the balm of authority and agency. I celebrate following the inspiration to make a little winter popup in instagram w my printed shirts and selling almost everything in 1.5 days after asking for money portals. Celebrating a friend who called a day to tell me he joins us for new years eve in the mountains, celebrating myself for being able to organize a thing w 8 people for five days in the alps for the start of a new year. A sensation in my body that grows and magnifies everyday of trust and everything is going to be alright, you’re safe, you're enough. Celebrating peas podcast episode w alejandra smits and being expanded by her way of writing. Sensing that if thats good my writing is good, too. And worth to share and express.", author: "Norene" },
  { id: 37, type: 'text', quote: "I feel the most stable and trusting I have ever felt. I know that not only can I handle whatever comes my way but that I am skilled in creating the momentum I desire.\nLast night I hosted the most successful event I’ve done solo. I didn’t just want ticket sales… I wanted to attract the people that fit into the energy of how I want to host… and last night I got just that. I felt true and real and satisfied while participants went on a deep journey. It was so great.", author: "Andrea" },
  { id: 38, type: 'text', quote: "During our RTK call yesterday, a desire surfaced and articulated itself very bluntly. It was very liberating to embrace this desire with little-to-none shame or blame and I celebrate that it appeared in a very direct, clear communication.\nI look forward to specifically taking actions on behalf of my business aspect (naming this aspect “babar” lol); today I will be writing up a  pretty thrilling invoice that may be for the largest amount of my life so far? That’s the type of thing that will make my business aspect feel supported.\nNow I will be drinking tea and animating on this snowy day…", author: "e" },
  { id: 39, type: 'text', quote: "Today I finished the manuscript for my second book. It feels magical and also like something I am probably going to do again because the identity of writer is starting to grow on me. The pictures taken for the book are absolutely marvelous. Like they should be shown in an exhibition by themselves.", author: "Mani" },
  { id: 40, type: 'text', quote: "Well done on the amplification ritual Pea, that was a trip! I feel amplified and really enjoyed the throwback theme. I felt like a kid playing computer games on MS-DOS.", author: "Andrea" },
  { id: 41, type: 'text', quote: "Much to celebrate over here. I desire to engage with inspiring & interesting thinkers and artists, and that is definitely happening lately. A dear old friend has published her memoir and is on the cover of the ny times book review. I have truly never been drawn to her celebrity or notoriety but instead of her high standard for fund and life, and her curiosity for all the different ways life can be outside of humdrum societal thinking. Secondly, one of my favorite underground theater artists wants to meet this week and collaborate on a video for their next show which will surely be fab. Finally I was recording at a studio and the owner/operator is hilarious but also deeply knowledgeable about music of course, and I was eating up the insights they were sharing about music and specific recording practices.", author: "E" },
  { id: 42, type: 'image', src: 'https://i.imgur.com/CrdpyRj.jpeg', alt: 'Testimonial screenshot' },
];

// ---------- TestimonialCarousel Component ----------
const TestimonialCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

  // Use the full testimonial data list
  const testimonials = pearTestimonials;
  const totalTestimonials = testimonials.length;

  // --- OPTIMIZATION: Calculate which slides to render ---
  const getSlidesToRender = () => {
    const slides: (typeof testimonials[number] & { originalIndex: number })[] = [];
    if (totalTestimonials === 0) {
      return slides;
    }
    const prevIndex = (activeIndex - 1 + totalTestimonials) % totalTestimonials;
    const nextIndex = (activeIndex + 1) % totalTestimonials;

    const indicesToRender = new Set([prevIndex, activeIndex, nextIndex]);

    indicesToRender.forEach((index) => {
      slides.push({
        ...testimonials[index],
        originalIndex: index,
      });
    });

    slides.sort((a, b) => {
      let diffA = a.originalIndex - activeIndex;
      let diffB = b.originalIndex - activeIndex;
      if (diffA > totalTestimonials / 2) diffA -= totalTestimonials;
      if (diffA < -totalTestimonials / 2) diffA += totalTestimonials;
      if (diffB > totalTestimonials / 2) diffB -= totalTestimonials;
      if (diffB < -totalTestimonials / 2) diffB += totalTestimonials;
      return diffA - diffB;
    });

    return slides;
  };

  const slidesToRender = getSlidesToRender();
  // --- END OPTIMIZATION ---

  // Handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = PLACEHOLDER_IMAGE;
    e.currentTarget.alt = 'Placeholder Image';
  };

  // useEffect for 3D positioning of rendered slides
  useEffect(() => {
    if (!orbitRef.current || totalTestimonials === 0) return;
    const cards = Array.from(orbitRef.current.querySelectorAll('.testimonial-card'));
    if (cards.length !== slidesToRender.length) return;

    const radius = 280;
    
    // Batch DOM operations to prevent layout thrashing
    requestAnimationFrame(() => {
      cards.forEach((card, cardDomIndex) => {
        const slideData = slidesToRender[cardDomIndex];
        if (!slideData) return;
        
        const originalIndex = slideData.originalIndex;
        const angleOffset = totalTestimonials > 0
          ? (((originalIndex - activeIndex + totalTestimonials) % totalTestimonials) / totalTestimonials) * Math.PI * 2
          : 0;
        
        const x = Math.sin(angleOffset) * radius;
        const z = Math.cos(angleOffset) * radius;
        const isActive = originalIndex === activeIndex;
        const scale = isActive ? 1 : 0.85;
        const opacity = isActive ? 1 : 0.5;
        const zIndex = isActive ? 100 : Math.round(50 + (z / (radius * 2)) * 50);
        
        // Use transform: translate3d for hardware acceleration
        const el = card as HTMLElement;
        el.style.transform = `translate3d(-50%, -50%, 0) translateX(${x}px) translateZ(${z}px) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${zIndex}`;
      });
    });
  }, [activeIndex, totalTestimonials, slidesToRender]);

  // Rotation logic
  const rotateCarousel = (direction: 'next' | 'prev') => {
    if (isAnimating || totalTestimonials === 0) return;
    setIsAnimating(true);
    const newIndex =
      direction === 'next'
        ? (activeIndex + 1) % totalTestimonials
        : (activeIndex - 1 + totalTestimonials) % totalTestimonials;
    setActiveIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 800);
  };

  // Indicator click logic
  const goToSlide = (index: number) => {
    if (!isAnimating && index !== activeIndex && totalTestimonials > 0) {
      setIsAnimating(true);
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  return (
    <Section id="testimonials-section">
      <div className="container mx-auto px-4" style={{ 
        position: 'relative',
      }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '30px', maxWidth: '800px', zIndex: 5 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            style={{ marginBottom: '16px' }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                color: 'rgba(255, 255, 255, 0.7)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontSize: '14px',
              }}
            >
              Testimonials
            </span>
          </motion.div>
          <h2 style={{ fontFamily: 'serif', fontSize: '36px', color: 'white', marginBottom: '24px', fontWeight: '200' }}>
            Transformative Experiences
          </h2>
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '18px',
              maxWidth: '600px',
              margin: '0 auto',
              fontWeight: '300',
            }}
          >
            Hear from our members about their journey and the impact it's had.
          </p>
        </div>

        {/* 3D Carousel Container */}
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1200px',
            height: '500px',
            perspective: '1200px',
            marginBottom: '64px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Navigation buttons */}
          <div style={{ position: 'absolute', top: '50%', left: '20px', transform: 'translateY(-50%)', zIndex: 110 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              onClick={() => rotateCarousel('prev')}
              disabled={isAnimating}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                cursor: isAnimating ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              }}
            >
              ←
            </motion.button>
          </div>
          <div style={{ position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)', zIndex: 110 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              onClick={() => rotateCarousel('next')}
              disabled={isAnimating}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                cursor: isAnimating ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              }}
            >
              →
            </motion.button>
          </div>

          {/* Central orbit display */}
          <div
            ref={orbitRef}
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Map over the subset of slides */}
            {slidesToRender.map((testimonial) => (
              <div
                key={testimonial.id}
                className="testimonial-card"
                onMouseEnter={() => setHover(testimonial.originalIndex)}
                onMouseLeave={() => setHover(null)}
                style={{
                  position: 'absolute',
                  width: '340px',
                  minHeight: '250px',
                  top: '50%',
                  left: '50%',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  opacity: 0, // Start hidden; positioning effect will update opacity
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    padding: '24px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow:
                      hover === testimonial.originalIndex
                        ? '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)'
                        : '0 4px 12px rgba(0, 0, 0, 0.15)',
                    transition: 'box-shadow 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '60%',
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent)',
                      transform: 'rotate(5deg) translateY(-50%) translateX(-10%)',
                      pointerEvents: 'none',
                    }}
                  />
                  <StarsBackground />
                  <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
                    {testimonial.type === 'text' ? (
                      <>
                        <p
                          style={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontStyle: 'italic',
                            marginBottom: '16px',
                            fontWeight: '300',
                            lineHeight: '1.5',
                            fontSize: '16px',
                            maxHeight: '150px',
                            overflowY: 'auto',
                            paddingRight: '5px',
                          }}
                        >
                          "{testimonial.quote}"
                        </p>
                        {testimonial.author && (
                          <h4
                            style={{
                              color: 'white',
                              fontWeight: '400',
                              fontSize: '14px',
                              margin: '10px 0 0 0',
                            }}
                          >
                            - {testimonial.author}
                          </h4>
                        )}
                      </>
                    ) : (
                      <img
                        src={testimonial.src}
                        alt={testimonial.alt || 'Testimonial Image'}
                        onError={handleImageError}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '200px',
                          height: 'auto',
                          borderRadius: '8px',
                          objectFit: 'contain',
                          margin: 'auto',
                        }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      color: 'rgba(255, 255, 255, 0.1)',
                      fontSize: '32px',
                      fontFamily: 'serif',
                      zIndex: 1,
                    }}
                  >
                    ❝
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '16px',
                      color: 'rgba(255, 255, 255, 0.1)',
                      fontSize: '32px',
                      fontFamily: 'serif',
                      zIndex: 1,
                    }}
                  >
                    ❞
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicator dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', zIndex: 5 }}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                transition: 'all 0.4s ease',
                width: index === activeIndex ? '40px' : '8px',
                height: '8px',
                background: index === activeIndex ? '#3b82f6' : 'rgba(255, 255, 255, 0.3)',
                borderRadius: '999px',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default TestimonialCarousel;
