/**
 * Kids Storytelling & Comprehension Quiz Engine
 * Features 16+ engaging children's stories across Short, Medium, and Long lengths,
 * with moral values, interactive comprehension questions, voice evaluation, and badges.
 */

class KidsStoryEngine {
  constructor() {
    this.currentActiveQuiz = null; // Stores story currently being tested
    this.lastStoryIndex = -1;

    this.stories = [
      // ==================== SHORT STORIES (1-2 MINS) ====================
      {
        id: 'story-little-star',
        title: "Pip the Star Who Learned to Shine",
        emoji: "⭐🌙",
        category: "Self-Confidence",
        lengthType: "short",
        duration: "1-2 Mins",
        summary: "Pip feels too small to light up the night sky until a lost puppy needs his gentle sparkle.",
        content: `High above the fluffy night clouds lived Pip, the smallest star in the galaxy. While the giant stars shone with booming blue and silver beams, Pip's light was just a soft, warm golden glow.

"I'm too tiny," sighed Pip. "Nobody on Earth can see my little light."

One dark night, a thick blanket of fog rolled over the green meadows on Earth below. A little puppy named Barnaby had wandered away from his cottage and couldn't see the path back home.

The big bright stars were shining so far up in the sky that their rays couldn't pierce through the low fog. But Pip was small and nimble! He gently drifted lower, right above the meadow.

Pip focused all his energy and beamed his warm golden sparkle through the mist. The soft glow lit up the pathway like a string of fairy lights. Barnaby wagged his tail happily and trotted safely back to his family's doorstep.

From that night on, Pip knew that you don't have to be the biggest star to make a wonderful difference in someone's world.`,
        moral: "Every one of us has a unique light that matters.",
        quiz: {
          question: "Who was lost in the dark meadow, and how did little star Pip help him?",
          targetKeywords: ["puppy", "barnaby", "dog", "lost puppy", "lit the path", "shone light through fog"],
          acceptableDetails: ["guided him home", "golden glow", "helped him see the path"],
          funFact: "Did you know? The light from stars we see tonight started traveling through space thousands of years ago!"
        }
      },
      {
        id: 'story-wise-ant',
        title: "Andy the Helpful Little Ant",
        emoji: "🐜🍃",
        category: "Teamwork & Perseverance",
        lengthType: "short",
        duration: "1-2 Mins",
        summary: "Andy finds a heavy grain of rice and learns how teamwork makes giant tasks easy.",
        content: `On a warm sunny afternoon, Andy the ant was marching across the garden. Near a red flowerpot, he found a marvelous prize: a giant, delicious grain of white rice!

Andy pushed with his front legs. He pulled with his tiny antennae. But the rice grain was simply too heavy for one little ant.

Instead of giving up and crying, Andy tapped a rhythm on the ground with his feet. Within seconds, his best friends, Bella and Ben, rushed over to help.

"Together on the count of three!" cheered Andy. "One, two, three, LIFT!"

Working as one strong team, the three ants hoisted the rice high above their heads and marched joyfully back into the anthill, where all their friends celebrated the feast.`,
        moral: "When we work together, no challenge is too big.",
        quiz: {
          question: "What heavy food did Andy find, and how was he able to carry it back to the anthill?",
          targetKeywords: ["rice", "grain of rice", "friends", "teamwork", "bella", "ben", "lifted together"],
          acceptableDetails: ["worked as a team", "called his friends", "tapped his feet"],
          funFact: "Did you know? An ant can lift up to 50 times its own body weight!"
        }
      },
      {
        id: 'story-honest-woodcutter',
        title: "The Golden Axe of Truth",
        emoji: "🪓💧",
        category: "Honesty & Integrity",
        lengthType: "short",
        duration: "2 Mins",
        summary: "An honest woodcutter loses his iron axe in a river and receives a magical reward for telling the truth.",
        content: `Deep in the forest, a humble woodcutter named Leo was chopping firewood near a sparkling river. Suddenly, his old iron axe slipped from his hands and splashed into the deep water!

Leo sat by the riverbank, worried about how he would feed his family. Suddenly, the Water Guardian rose from the ripples with a shimmering gold axe in her hands.

"Is this golden axe yours?" she asked gently.

Leo shook his head honestly. "No, that is not mine. My axe was just made of plain iron."

The Guardian smiled brightly. "Because of your true honesty, you may keep both this magical golden axe and your own iron axe!" Leo thanked the Guardian, happy that telling the truth always brings honor.`,
        moral: "Honesty is always the greatest treasure.",
        quiz: {
          question: "Why did the Water Guardian give Leo the golden axe as a gift?",
          targetKeywords: ["honesty", "truth", "told the truth", "did not lie", "admitted it was not his"],
          acceptableDetails: ["he was honest", "plain iron axe"],
          funFact: "Did you know? The story of the Honest Woodcutter is one of Aesop's most famous fables, told for over 2,500 years!"
        }
      },
      {
        id: 'story-rainbow-butterfly',
        title: "Breezy and the Rainbow Wings",
        emoji: "🦋🌈",
        category: "Kindness & Empathy",
        lengthType: "short",
        duration: "1-2 Mins",
        summary: "A colorful butterfly shares drops of nectar with thirsty bees on a hot summer day.",
        content: `In the Blossom Meadow, Breezy the butterfly had the most radiant wings painted in blue, violet, and gold. 

One sweltering afternoon, Breezy found a hidden pond filled with sweet honey-nectar blossoms. She drank her fill, but noticed three tiny worker bees exhausted on a dry leaf, too tired to fly home.

Breezy fluttered her wings to fan a cool breeze over the bees. Then, she gently carried sweet drops of water in tiny flower petals over to them. 

Refreshed and full of energy, the little bees buzzed happily around Breezy in a joyful dance. "Kindness is the sweetest nectar of all," Breezy whispered with a smile.`,
        moral: "Helping others in need brings sweetness to everyone's day.",
        quiz: {
          question: "How did Breezy the butterfly help the tired little bees?",
          targetKeywords: ["water", "nectar", "flower petals", "fanned cool breeze", "carried drops"],
          acceptableDetails: ["helped them drink", "fanned wings", "refreshed them"],
          funFact: "Did you know? Butterflies taste food using special sensors on their feet!"
        }
      },
      {
        id: 'story-friendly-cloud',
        title: "Cumulus the Thirsty Garden's Hero",
        emoji: "☁️🌻",
        category: "Generosity",
        lengthType: "short",
        duration: "2 Mins",
        summary: "A fluffy cloud travels across the hills to bring cool rain to a wilting field of sunflowers.",
        content: `Cumulus was a fluffy white cloud who loved floating high in the sky and making funny shapes like elephants and pirate ships.

One sunny afternoon, Cumulus looked down and saw a hillside of sunflowers with drooping heads. "We are so thirsty!" whispered Sunny, the tallest sunflower.

Cumulus knew what he had to do. He invited his cloud friends to gather together. Slowly, Cumulus transformed into a gentle, grey raincloud and sprinkled fresh, cool raindrops all over the garden.

The sunflowers stood tall and smiled at the blue sky as a bright rainbow arched across the valley.`,
        moral: "Generosity and sharing your gifts bring life and happiness to others.",
        quiz: {
          question: "What did Cumulus the cloud do when he saw the thirsty sunflowers?",
          targetKeywords: ["rained", "sprinkled rain", "brought raindrops", "showered water", "cooled them down"],
          acceptableDetails: ["gathered cloud friends", "became raincloud", "watered sunflowers"],
          funFact: "Did you know? An average fluffy cumulus cloud weighs about 1.1 million pounds—the weight of 100 elephants!"
        }
      },

      // ==================== MEDIUM STORIES (3-5 MINS) ====================
      {
        id: 'story-sea-turtle',
        title: "Kavi the Brave Little Sea Turtle",
        emoji: "🐢🌊",
        category: "Courage & Kindness",
        lengthType: "medium",
        duration: "3-4 Mins",
        summary: "Kavi embarks on his first ocean adventure and helps a trapped starfish find its way home.",
        content: `Once upon a time, on the golden sands of a sunny beach, lived a tiny sea turtle named Kavi. Kavi had shiny emerald flippers and big curious eyes. Today was the most exciting day of his life: his very first swim in the great blue ocean!

As Kavi splashed into the crystal clear water, the gentle waves carried him along. The underwater world was full of vibrant colors—bright pink coral reefs, dancing clownfish, and swaying seaweeds. 

Suddenly, Kavi heard a quiet cry behind a large conch shell. "Help! I'm stuck!" cried a little golden starfish named Tara. A drifting piece of seaweed had wrapped around her arm.

Even though Kavi was eager to swim forward and explore, he remembered what his wise grandmother had told him: *'True strength is helping someone in need.'*

Kavi carefully used his smooth beak to loosen the seaweed knot. With a gentle tug, Tara was free! "Thank you, Kavi! You are so brave and kind," cheered Tara. 

To thank him, Tara showed Kavi a magical shortcut through the coral garden where the warm ocean current danced like music. Kavi swam happily, knowing that kindness always brings the sweetest rewards.`,
        moral: "Kindness and helping others make any journey magical.",
        quiz: {
          question: "Who did Kavi help in the ocean, and what was her name?",
          targetKeywords: ["tara", "starfish", "golden starfish", "star fish", "little starfish"],
          acceptableDetails: ["stuck in seaweed", "helped free her", "untangled seaweed"],
          funFact: "Did you know? Sea turtles have lived in our oceans for over 100 million years, even before dinosaurs vanished!"
        }
      },
      {
        id: 'story-sammy-squirrel',
        title: "Sammy and the Sparkling Golden Acorn",
        emoji: "🐿️✨",
        category: "Sharing & Friendship",
        lengthType: "medium",
        duration: "3 Mins",
        summary: "Sammy discovers a rare golden acorn and learns that joy doubles when shared.",
        content: `In the heart of the Whispering Woods, Sammy the squirrel was the fastest acorn collector. One crisp autumn morning, high up on the ancient Oak Tree, Sammy spotted something dazzling—a rare, glowing Golden Acorn!

"Wow! This is the most special acorn in the entire forest!" gasped Sammy. At first, Sammy wanted to hide it deep inside his secret tree hollow so nobody else could ever touch it.

Later that afternoon, Sammy saw his best friend Bella the bluebird shivering on a chilly branch, and Oliver the rabbit looking tired from gathering winter berries. 

Sammy looked at the glowing golden acorn. He realized that hiding it made him feel lonely. So, Sammy called all his forest friends together beneath the Great Oak. 

"Look what I found! Let's celebrate our autumn feast together!" smiled Sammy. The golden acorn glowed so brightly that it warmed the whole clearing, filling everyone's hearts with joy and laughter. Sammy realized that sharing with friends is the greatest treasure of all.`,
        moral: "Sharing your treasures with friends brings the truest happiness.",
        quiz: {
          question: "What special treasure did Sammy find in the ancient Oak Tree, and what did he decide to do with it?",
          targetKeywords: ["golden acorn", "acorn", "sparkling acorn", "shared", "shared with friends", "autumn feast"],
          acceptableDetails: ["invited bella and oliver", "did not hide it", "celebrated together"],
          funFact: "Did you know? Squirrels plant thousands of trees every year because they hide acorns and forget where they put them!"
        }
      },
      {
        id: 'story-luna-space-cat',
        title: "Luna the Astro-Cat and the Stardust Compass",
        emoji: "🚀🐱",
        category: "Curiosity & Science",
        lengthType: "medium",
        duration: "4 Mins",
        summary: "Luna the adventurous cat builds a cardboard rocket and discovers how gravity and star maps work.",
        content: `Luna was no ordinary calico cat. While other cats chased yarn, Luna spent her evenings gazing through a brass telescope at the rings of Saturn and the craters on the Moon.

With the help of her robot companion, Gizmo, Luna built the *Stardust Flyer*—a cozy spaceship powered by solar sails! Wearing her custom bubble helmet, Luna launched into orbit.

As they floated gently past the International Space Station, Luna noticed that her floating cat treats didn't fall down! "Look Gizmo, zero gravity!" she purred.

Suddenly, their navigation computer blinked. The route back to Earth was obscured by cosmic dust! Luna stayed calm. She pulled out her grandfather's brass Stardust Compass and aligned it with the North Star, Polaris.

Following the starry guideposts, the *Stardust Flyer* glided smoothly back into Earth's atmosphere, landing softly in Luna's backyard just in time for breakfast.`,
        moral: "Staying calm and using your knowledge will always guide you home.",
        quiz: {
          question: "What did Luna use to navigate her spaceship safely back to Earth when the computer blinked?",
          targetKeywords: ["stardust compass", "compass", "north star", "polaris", "brass compass"],
          acceptableDetails: ["aligned with north star", "grandfather's compass"],
          funFact: "Did you know? The North Star (Polaris) has been used by sailors and navigators for centuries because it stays in almost the same spot in the northern night sky!"
        }
      },
      {
        id: 'story-brave-firefly',
        title: "Felix the Firefly's Lighthouse Beam",
        emoji: "🪲💡",
        category: "Courage & Teamwork",
        lengthType: "medium",
        duration: "3-4 Mins",
        summary: "Felix rallies his fellow fireflies to guide a lost sailboat during a stormy night.",
        content: `On the rocky shores of Whispering Cove, Felix the firefly lived among the reeds. While other fireflies flashed in short, quick bursts, Felix loved practicing steady, long glows.

One stormy evening, the electric bulb on the old cliffside lighthouse went dark with a loud *POP*! Out at sea, Captain Jonah's fishing boat was drifting toward the sharp coral reefs, unable to see the harbor entrance.

Felix knew there was no time to lose. He flew from tree to tree, calling all hundred fireflies in the valley. "Form a line inside the lighthouse glass lantern!" Felix shouted above the wind.

Together, the fireflies landed on the giant magnifying lens. On Felix's signal, every firefly lit up at the exact same moment!

Their combined emerald light beamed miles across the dark ocean, guiding Captain Jonah safely into the calm harbor waters. The townsfolk cheered, learning that even the smallest creatures can do heroic things when they unite!`,
        moral: "Even the smallest among us can accomplish giant feats when working together.",
        quiz: {
          question: "Where did Felix and the fireflies gather to guide Captain Jonah's boat safely into harbor?",
          targetKeywords: ["lighthouse", "lantern", "lighthouse glass", "magnifying lens"],
          acceptableDetails: ["lit up together", "inside the lighthouse lantern"],
          funFact: "Did you know? Firefly light produces zero heat—it is 100% efficient bioluminescent light!"
        }
      },
      {
        id: 'story-musical-dolphin',
        title: "Echo the Dolphin's Ocean Symphony",
        emoji: "🐬🎶",
        category: "Creativity & Friendship",
        lengthType: "medium",
        duration: "3-4 Mins",
        summary: "Echo creates a musical melody to help a frightened baby whale find its mother.",
        content: `In the azure waters of the Great Barrier Lagoon, Echo the dolphin was known for his melodious whistles and playful clicks.

One morning, Echo heard a deep, mournful hum echoing through the underwater canyons. Swimming quickly, he found Barnaby, a baby humpback whale who had drifted away from his mother's pod during a migration.

Echo knew that sound travels four times faster underwater than in air! "Don't worry, Barnaby. We will sing together so your mother can hear you across the entire bay!"

Echo composed a cheerful harmony, matching his high-pitched whistles with Barnaby's deep, booming song. The beautiful melody reverberated through the oceanic depths.

Within minutes, the gentle calls of Barnaby's mother echoed back. The mother whale surfaced with a mighty spout of rainbow water, joyfully reuniting with her baby.`,
        moral: "Creativity and harmony can solve problems and bridge any distance.",
        quiz: {
          question: "How did Echo the dolphin help the baby whale Barnaby find his mother?",
          targetKeywords: ["whistles", "song", "singing", "melody", "symphony", "harmony", "sound underwater"],
          acceptableDetails: ["sang together", "created a tune", "sound traveled through water"],
          funFact: "Did you know? Dolphins have signature whistles that act just like human names!"
        }
      },

      // ==================== LONG STORIES (5-8 MINS) ====================
      {
        id: 'story-golden-feather-quest',
        title: "The Quest for the Golden Feather of Mount Whispers",
        emoji: "🦅🏔️",
        category: "Adventure & Wisdom",
        lengthType: "long",
        duration: "6-7 Mins",
        summary: "Two brave siblings journey through three magical trials to heal the Great Forest Tree.",
        content: `Once upon a time, on the edge of the Enchanted Valley, lived two curious siblings named Arjun and Diya. In the center of their village stood the ancient Silver Willow, a magical tree whose leaves gave clean water and sweet fruit to all animals.

One spring morning, the Silver Willow began to fade. The village Elder consulted the ancient scrolls: "Only the Golden Feather of the Sun Phoenix atop Mount Whispers can restore the tree's magic. But the mountain path tests courage, wit, and kindness."

Arjun packed his warm blanket, and Diya packed her canteen of fresh water and a sketchbook. Together, they began the climb.

**The First Trial: The Riddle of the River of Mirrors**
At the base of the mountain, a roaring crystal river blocked their path. The River Guardian, a giant stone tortoise, opened his eyes. "To cross, solve this: *'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?'*"
Diya thought for a moment, listening to the mountain breeze. "An Echo!" she answered brightly. The tortoise smiled and lowered a stepping-stone bridge.

**The Second Trial: The Shadow Forest of Thorns**
Higher up the mountain, thick thorny briars twisted across the dark path. Arjun noticed a little hedgehog trapped beneath a fallen branch. Instead of rushing past, Arjun gently lifted the heavy branch, and Diya cleaned the hedgehog's paw with water.
Gratefully, the hedgehog led them through a secret mossy tunnel beneath the thorns, bypassing the dangerous shadows completely!

**The Third Trial: The Peak of the Phoenix**
At last, they reached the snowy summit where the majestic Sun Phoenix rested upon a nest of starlight. The Phoenix spoke with a voice like warm bells: "You have shown intellect with the riddle, and compassion to the forest creatures. The greatest power is not taking, but caring."
The Phoenix plucked a single radiant Golden Feather and placed it in Diya's hands.

Arjun and Diya rushed back to the village. As they touched the Golden Feather to the roots of the Silver Willow, emerald leaves burst into bloom, showering the valley in fragrant blossoms. The village rejoiced, and the siblings were celebrated as True Keepers of the Forest.`,
        moral: "Intellect, compassion, and perseverance are the keys to overcoming life's greatest challenges.",
        quiz: {
          question: "What was the answer to the River Guardian's riddle, and what creature did the siblings rescue in the second trial?",
          targetKeywords: ["echo", "hedgehog", "little hedgehog"],
          acceptableDetails: ["riddle was an echo", "rescued a trapped hedgehog", "helped the hedgehog"],
          funFact: "Did you know? Phoenix legends exist in ancient Greek, Egyptian, Chinese, and Indian folklore, symbolizing renewal and hope!"
        }
      },
      {
        id: 'story-robot-who-painted',
        title: "Bolt 7: The Robot Who Wanted to Paint Sunsets",
        emoji: "🤖🎨",
        category: "Creativity & Individuality",
        lengthType: "long",
        duration: "5-6 Mins",
        summary: "A mechanical factory robot discovers a paint set and shows a bustling city the magic of art and emotion.",
        content: `In the futuristic city of Neo-Metropolis, thousands of robots worked tirelessly. There were welding robots, sweeping robots, and delivery drones. Among them was Bolt 7, a small silver robot with glowing blue optical sensors.

Bolt's official job was sorting colorful metal tiles in the storage depot. But Bolt had a secret passion. Every evening at 6:00 PM, Bolt climbed to the depot rooftop to watch the sky turn from golden amber to deep purple-pink.

One afternoon, Bolt found an abandoned wooden easel, brushes, and tubes of oil paint left behind by an art student. 

Bolt's circuits hummed with excitement. Dipping a bristle brush into titanium white and cadmium orange, Bolt began painting on an old aluminum sheet. He painted swirling clouds, shimmering twilight horizons, and the warm reflections on the city skyscrapers.

The Chief Inspector arrived the next morning. "Robots are built for calculating gears and numbers, not painting pictures!" the Inspector declared sternly, raising his hand to recycle the canvas.

Just then, a crowd of city residents gathered around the painting. "Look at how the colors bring warmth to our cold metal streets!" gasped a schoolgirl. "This painting makes me feel hopeful and happy!" said an elderly clockmaker.

The Chief Inspector paused. He looked at the painting, then at Bolt's gentle blue sensors. "Perhaps," the Inspector whispered, "true intelligence is not just processing data, but feeling the beauty of the world."

From that day forward, Bolt 7 was officially designated as Neo-Metropolis's First Artist-in-Residence, teaching children and robots alike how to paint their dreams in vibrant colors.`,
        moral: "Your passions and creativity make you truly unique, no matter who you are.",
        quiz: {
          question: "What did Bolt 7 paint on the rooftop, and what official new job was he given at the end?",
          targetKeywords: ["sunset", "sky", "clouds", "artist", "artist in residence", "first artist"],
          acceptableDetails: ["painted evening sky", "became the city artist", "painted colors"],
          funFact: "Did you know? The word 'Robot' was first introduced in 1920 by Czech writer Karel Čapek in his science fiction play R.U.R.!"
        }
      },
      {
        id: 'story-time-travel-watch',
        title: "Maya and the Clockwork Pocket Watch of 1880",
        emoji: "⏱️🚂",
        category: "History & Science",
        lengthType: "long",
        duration: "6-7 Mins",
        summary: "Maya discovers an antique pocket watch in her grandfather's attic that reveals how early inventions shaped our world.",
        content: `During summer vacation, 10-year-old Maya loved exploring her grandfather's attic filled with dusty telescopes, antique maps, and leather-bound journals.

In a carved mahogany box, Maya uncovered a shimmering brass pocket watch with three gears and an inscription: *'Turn three times counter-clockwise to see where steam began.'*

Curious, Maya wound the watch crown three times. A golden shimmer enveloped the room! When the light cleared, Maya found herself standing on a bustling train platform in the year 1880, surrounded by grand steam locomotives billowing white clouds into the crisp morning air.

A friendly conductor named Mr. Higgins tipped his cap. "Welcome aboard the Iron Pegasus, young traveler! Today we test the new telegraph signaling system!"

Maya watched in awe as coal heated the massive water boilers, turning water into high-pressure steam that pushed heavy steel pistons, turning the massive iron train wheels. 

"Steam engines and telegraphs connected distant towns, allowing people to send messages in seconds instead of weeks!" Mr. Higgins explained with pride.

Maya took out her notebook and sketched the boiler pressure gauges, the Morse code telegraph key, and the steam whistle. 

When the pocket watch chimed, Maya turned the crown three times clockwise. With a gentle breeze, she was back safely in her grandfather's sunny attic. She ran downstairs to show her grandfather her historical sketches, knowing that every modern invention started with a spark of human curiosity.`,
        moral: "Understanding history and science helps us appreciate the wonders of the modern world.",
        quiz: {
          question: "What type of engine was powering the train Maya visited in 1880, and what machine sent fast messages?",
          targetKeywords: ["steam", "steam engine", "locomotive", "telegraph", "morse code"],
          acceptableDetails: ["steam train", "telegraph signaling", "coal and water boiler"],
          funFact: "Did you know? The first commercial steam train journey took place in 1804, traveling at a top speed of just 5 miles per hour!"
        }
      },
      {
        id: 'story-coral-kingdom',
        title: "The Secret Guardian of the Coral Kingdom",
        emoji: "🐠👑",
        category: "Nature & Conservation",
        lengthType: "long",
        language: "en-US",
        duration: "6-7 Mins",
        summary: "A young scuba diver and a wise octopus restore balance to a bleached coral reef.",
        content: `Off the tropical island of Palawan, 11-year-old Sam loved snorkeling with his marine biologist mother. One morning, while swimming near the outer reef, Sam noticed that large patches of vibrant coral had turned pale white.

"It is coral bleaching," his mother explained. "When the water gets too warm or polluted, the microscopic algae living inside corals leave, making them lose their color and health."

Determined to help, Sam swam closer to an underwater sea cavern. Suddenly, an octopus named Octavius emerged, his skin shifting in mesmerizing rainbow camouflage. 

"Human friend," Octavius spoke through underwater sound pulses. "The reef's heart crystal is covered in discarded plastic nets, blocking the cool ocean currents from circulating."

Sam signaled his mother. Working with diving shears, they carefully untangled the heavy ghost nets from the coral structure and collected five bags of floating plastic debris.

With the nets removed, the cool ocean tide swept smoothly through the lagoon channels once again. Within weeks, vibrant green, orange, and purple polyps recolonized the reef, and schools of clownfish and angelfish returned to celebrate the restored sanctuary.`,
        moral: "Taking care of our oceans protects the home of millions of wondrous creatures.",
        quiz: {
          question: "What was blocking the cool ocean currents from reaching the coral reef, and who helped Sam find it?",
          targetKeywords: ["nets", "plastic", "ghost nets", "octopus", "octavius"],
          acceptableDetails: ["untangled nets", "plastic debris", "octopus showed the way"],
          funFact: "Did you know? Coral reefs support more than 25% of all marine life, even though they cover less than 1% of the ocean floor!"
        }
      },

      // ==================== TAMIL STORIES (தமிழ் கதைகள்) ====================
      {
        id: 'story-tamil-crow',
        title: "அறிவுள்ள காகமும் தண்ணீர் குடமும்",
        emoji: "🦅🏺",
        category: "புத்தி கூர்மை",
        lengthType: "short",
        language: "ta-IN",
        duration: "2 Mins",
        summary: "தாகமடைந்த காகம் ஒன்று தனது புத்திசாலித்தனத்தால் குடத்து நீரை மேலே வரவழைத்துக் குடித்த கதை.",
        content: `ஒரு அழகிய காட்டில் காக்கையன் என்ற கருத்த காகம் வாழ்ந்து வந்தது. ஒரு கோடை காலத்தில் சுட்டெரிக்கும் வெயிலில் காக்கையனுக்கு கடுமையான தாகம் எடுத்தது. எங்கு தேடியும் தண்ணீர் கிடைக்கவில்லை.

நீண்ட தூரம் பறந்து சென்ற பிறகு, ஒரு தோட்டத்தின் நடுவில் ஒரு மண்பாண்டக் குடம் இருப்பதை கண்டது. மகிழ்ச்சியுடன் பறந்து சென்று குடத்தினுள் பார்த்தது.

குடத்தின் அடியில் சிறிதளவு தண்ணீரே இருந்தது. காகத்தின் சிறிய அலகால் அவ்வளவு ஆழத்திற்கு எட்ட முடியவில்லை. காகம் சோர்ந்து போகாமல் தன் புத்திசாலித்தனத்தை பயன்படுத்தியது.

அருகில் கிடந்த சிறு சிறு கூழாங்கற்களை ஒவ்வொன்றாக தன் அலகால் எடுத்து வந்து குடத்தினுள் போட்டது. கற்கள் நிரம்ப நிரம்ப, தண்ணீர் மெல்ல மேலே உயர்ந்தது! காக்கையன் மகிழ்ச்சியுடன் வயிறார தண்ணீர் குடித்து விட்டு 'கா... கா...' என்று பாடிப் பறந்தது.`,
        moral: "முயற்சியும் புத்திசாலித்தனமும் இருந்தால் எந்த கடினமான செயலையும் சாதிக்கலாம்.",
        quiz: {
          question: "குடத்தின் அடியில் இருந்த தண்ணீரை மேலே கொண்டு வர காகம் என்ன செய்தது?",
          targetKeywords: ["கூழாங்கற்கள்", "கற்கள்", "கல் போட்டது", "கற்களை போட்டது", "stones", "pebbles"],
          acceptableDetails: ["கற்களை எடுத்து போட்டது", "தண்ணீர் மேலே வந்தது"],
          funFact: "தெரியுமா? காகங்கள் மனிதர்களின் முகங்களை நினைவில் வைத்துக் கொள்ளும் அளவுக்கு அதிக அறிவுத்திறன் கொண்ட பறவைகள்!"
        }
      },
      {
        id: 'story-tamil-lion-mouse',
        title: "சிங்கமும் சிறிய எலியும்",
        emoji: "🦁🐭",
        category: "நட்பும் உதவியும்",
        lengthType: "short",
        language: "ta-IN",
        duration: "2 Mins",
        summary: "ஒரு சிறிய எலி எவ்வாறு காட்டரசன் சிங்கத்தை வேடனின் வலையிலிருந்து காப்பாற்றியது என்ற அழகிய கதை.",
        content: `ஒரு பெரிய காட்டில் ஒரு கம்பீரமான சிங்கம் ஒரு மரத்தடியில் தூங்கிக் கொண்டிருந்தது. அப்போது சுட்டி என்ற சிறிய எலி சிங்கத்தின் உடலின் மேல் ஏறி விளையாடியது.

கோபத்துடன் விழித்த சிங்கம் தன் பெரிய நகங்களால் எலியைப் பிடித்தது. "என்னை மன்னித்து விடுங்கள் சிங்க ராஜா! என்னை விட்டு விடுங்கள், ஒரு நாள் நான் உங்களுக்கு நிச்சயம் உதவி செய்வேன்!" என்று கெஞ்சியது சுட்டி. சிங்கம் சிரித்துக் கொண்டே எலியை விடுதலை செய்தது.

சில நாட்கள் கழித்து, வேடர்கள் விரித்த வலையில் சிங்கம் சிக்கிக் கொண்டது. சிங்கத்தால் தப்ப முடியவில்லை; கர்ஜித்தது.

சிங்கத்தின் குரலைக் கேட்ட சுட்டி எலி ஓடி வந்தது. தன் கூர்மையான பற்களால் வேடனின் வலையை கடித்து துண்டாக்கியது. சிங்கம் விடுதலையானது! அன்று முதல் சிங்கமும் எலியும் உற்ற நண்பர்களாயின.`,
        moral: "யாரையும் உருவத்தால் சிறியவர்கள் என்று நினைக்கக் கூடாது; சிறியவர்களாலும் பெரிய உதவி செய்ய முடியும்.",
        quiz: {
          question: "வேடனின் வலையில் சிக்கிய சிங்கத்தை எலி எவ்வாறு காப்பாற்றியது?",
          targetKeywords: ["பற்களால் கடித்தது", "வலை கடித்தது", "பற்கள்", "வலையை அறுத்த்து", "teeth", "chewed net"],
          acceptableDetails: ["கூர்மையான பற்கள்", "வலையை துண்டாக்கியது"],
          funFact: "தெரியுமா? எலியின் பற்கள் வாழ்நாள் முழுவதும் தொடர்ந்து வளர்ந்து கொண்டே இருக்கும்!"
        }
      },

      // ==================== SPANISH STORIES (CUENTOS EN ESPAÑOL) ====================
      {
        id: 'story-spanish-lion-mouse',
        title: "El León y el Ratón Agradecido",
        emoji: "🦁🐭",
        category: "Amistad y Bondad",
        lengthType: "short",
        language: "es-ES",
        duration: "2 Mins",
        summary: "Un pequeño ratón demuestra que incluso el ser más diminuto puede ayudar al rey de la selva.",
        content: `Dormía tranquilamente un gran león bajo la sombra de un árbol cuando un pequeño ratón travieso empezó a corretear sobre su lomo. El león despertó y atrapó al ratoncito bajo su enorme garra.

"¡Por favor, rey león, no me comas! Si me perdonas la vida, algún día podré ayudarte", suplicó el ratón. El león soltó una carcajada pensando cómo un animalito tan pequeño podría ayudarlo, pero de buen humor lo dejó marchar.

Días después, unos cazadores atraparon al león en una fuerte red de cuerdas. El león rugió con desesperación.

Al escuchar los rugidos, el ratoncito corrió al lugar y con sus afilados dientes royó las cuerdas de la red hasta romperlas por completo. El león quedó libre y desde aquel día fueron los mejores amigos.`,
        moral: "Ningún acto de bondad es demasiado pequeño; los amigos pequeños pueden ser grandes amigos.",
        quiz: {
          question: "¿Cómo logró el ratoncito liberar al león atrapado en la red?",
          targetKeywords: ["royó", "dientes", "mordió", "cuerdas", "red"],
          acceptableDetails: ["mordió las cuerdas", "con sus dientes"],
          funFact: "¿Sabías que los leones pueden dormir hasta 20 horas al día para ahorrar energía?"
        }
      },

      // ==================== HINDI STORIES (हिंदी कहानियाँ) ====================
      {
        id: 'story-hindi-crow',
        title: "चतुर कौआ और पानी का मटका",
        emoji: "🦅🏺",
        category: "बुद्धिमानी",
        lengthType: "short",
        language: "hi-IN",
        duration: "2 Mins",
        summary: "प्यासे कौए ने अपनी सूझबूझ से मटके में कंकड़ डालकर पानी पिया।",
        content: `एक बार की बात है, गर्मी के मौसम में एक कौए को बहुत तेज़ प्यास लगी थी। वह पानी की तलाश में इधर-उधर भटकने लगा।

काफी देर बाद उसे एक बगीचे में पानी का एक मटका दिखाई दिया। कौआ खुशी-खुशी मटके के पास पहुँचा, लेकिन मटके में पानी बहुत कम था और उसकी चोंच पानी तक नहीं पहुँच पा रही थी।

कौआ निराश नहीं हुआ। उसने पास पड़े छोटे-छोटे कंकड़ों को देखा। उसने एक-एक कंकड़ को अपनी चोंच से उठाया और मटके में डालना शुरू कर दिया।

धीरे-धीरे पानी ऊपर आ गया। कौए ने जी भरकर ठंडा पानी पिया और खुशी से उड़ गया।`,
        moral: "जहाँ चाह, वहाँ राह! कठिन परिस्थिति में सूझबूझ से काम लेना चाहिए।",
        quiz: {
          question: "कौए ने मटके के पानी को ऊपर लाने के लिए क्या किया?",
          targetKeywords: ["कंकड़", "पत्थर", "कंकड़ डाले", "pebbles", "stones"],
          acceptableDetails: ["चोंच से कंकड़ डाले", "पानी ऊपर आया"],
          funFact: "क्या आप जानते हैं? कौए बहुत बुद्धिमान पक्षी होते हैं जो औज़ारों का उपयोग करना भी जानते हैं!"
        }
      }
    ];
  }

  // Filter stories by length: 'short', 'medium', 'long', or 'any'
  getStoriesByLength(lengthType = 'any', language = 'en-US') {
    let pool = this.stories;
    if (language && language !== 'en-US') {
      const langPrefix = language.split('-')[0];
      pool = this.stories.filter(s => s.language && s.language.startsWith(langPrefix));
      if (pool.length === 0) pool = this.stories;
    }
    if (lengthType === 'any' || !lengthType) return pool;
    return pool.filter(s => s.lengthType === lengthType.toLowerCase());
  }

  // Get random or specific story with smart query parsing and language awareness
  getStory(query = '', currentLang = 'en-US') {
    const clean = query.toLowerCase();

    // Check if query is in Tamil or mentions Tamil
    let targetLang = currentLang;
    if (clean.includes('tamil') || clean.includes('தமிழ்') || clean.includes('கதை')) {
      targetLang = 'ta-IN';
    } else if (clean.includes('spanish') || clean.includes('español') || clean.includes('cuento')) {
      targetLang = 'es-ES';
    } else if (clean.includes('hindi') || clean.includes('हिंदी') || clean.includes('कहानी')) {
      targetLang = 'hi-IN';
    }

    // Check for length requests in query
    let lengthFilter = null;
    if (clean.includes('short story') || clean.includes('quick story') || clean.includes('1 min') || clean.includes('குட்டி கதை') || clean.includes('cuento corto')) {
      lengthFilter = 'short';
    } else if (clean.includes('long story') || clean.includes('chapter') || clean.includes('detailed story') || clean.includes('quest') || clean.includes('adventure') || clean.includes('பெரிய கதை')) {
      lengthFilter = 'long';
    } else if (clean.includes('medium story')) {
      lengthFilter = 'medium';
    }

    // Specific title / ID match
    for (let i = 0; i < this.stories.length; i++) {
      const s = this.stories[i];
      if (clean.includes(s.id) || 
          clean.includes(s.title.toLowerCase()) || 
          clean.includes(s.category.toLowerCase())) {
        this.lastStoryIndex = i;
        return s;
      }
    }

    // Filter by target language
    const langPrefix = targetLang.split('-')[0];
    let pool = this.stories.filter(s => (s.language || 'en-US').startsWith(langPrefix));
    if (pool.length === 0) pool = this.stories;

    if (lengthFilter) {
      const lengthPool = pool.filter(s => s.lengthType === lengthFilter);
      if (lengthPool.length > 0) pool = lengthPool;
    }

    // Pick a story different from the last one
    let nextIndex;
    if (pool.length > 1) {
      const filteredIndices = pool.map(s => this.stories.indexOf(s)).filter(idx => idx !== this.lastStoryIndex);
      nextIndex = filteredIndices[Math.floor(Math.random() * filteredIndices.length)];
    } else {
      nextIndex = this.stories.indexOf(pool[0]);
    }

    this.lastStoryIndex = nextIndex;
    return this.stories[nextIndex];
  }

  // Validate the kid's spoken or typed answer to the comprehension quiz
  evaluateComprehensionAnswer(userAnswerText) {
    if (!this.currentActiveQuiz) return null;

    const answer = (userAnswerText || '').toLowerCase();
    const { question, targetKeywords, acceptableDetails, funFact } = this.currentActiveQuiz.quiz;
    const storyTitle = this.currentActiveQuiz.title;

    let matchCount = 0;
    targetKeywords.forEach(kw => {
      if (answer.includes(kw.toLowerCase())) matchCount += 1.2;
    });

    acceptableDetails.forEach(detail => {
      if (answer.includes(detail.toLowerCase())) matchCount += 1.5;
    });

    const isExcellent = matchCount >= 1.5 || (matchCount >= 1 && answer.split(' ').length >= 3);
    const isGood = matchCount >= 0.8;

    let responsePayload = {};

    if (isExcellent) {
      responsePayload = {
        status: 'excellent',
        stars: '⭐⭐⭐⭐⭐ (5/5 Stars)',
        badge: '🏆 Master Story Listener Badge',
        praise: `🌟 **INCREDIBLE JOB!** You listened so carefully to *"${storyTitle}"*! Your answer is spot on!`,
        spokenPraise: "Incredible job! You listened so carefully to the story and got the answer completely right! Super Star Listener Badge awarded to you!",
        feedback: `You remembered key details and characters perfectly. Keep up this wonderful habit of mindful listening!`,
        funFact
      };
    } else if (isGood) {
      responsePayload = {
        status: 'good',
        stars: '⭐⭐⭐⭐ (4/5 Stars)',
        badge: '🌟 Great Listener Star Badge',
        praise: `👏 **GREAT WORK!** You remembered the important parts of the story!`,
        spokenPraise: "Great work! You understood the story very well and remembered the main character!",
        feedback: `You got the main idea! Next time, try to also remember the character's exact name for a full 5-star score!`,
        funFact
      };
    } else {
      responsePayload = {
        status: 'encouraging',
        stars: '⭐⭐⭐ (3/5 Stars)',
        badge: '🌱 Curious Explorer Badge',
        praise: `👍 **Good try!** You are practicing and learning every single time!`,
        spokenPraise: "Good try! Listening to stories is a great way to practice. Here is a little hint for next time.",
        feedback: `The correct answer was related to: **${targetKeywords.slice(0, 2).join(', ')}**. Whenever listening to a story, try picturing the characters in your mind like a movie!`,
        funFact
      };
    }

    return responsePayload;
  }

  // Render HTML for the Story Card & Comprehension Challenge with Length Filters
  renderStoryCard(story) {
    this.currentActiveQuiz = story;

    const lengthBadgeClass = story.lengthType || 'medium';
    const lengthLabel = story.lengthType === 'short' ? '⚡ Short (1-2m)' : (story.lengthType === 'long' ? '📚 Long (5-7m)' : '📖 Medium (3-4m)');

    return `
      <div class="rich-widget-card story-card-widget">
        <!-- Story Quick Navigation / Filter Bar -->
        <div class="story-filter-row">
          <button class="story-filter-chip ${story.lengthType === 'short' ? 'active' : ''}" onclick="window.StoryController.filterStory('short')">⚡ Short Stories</button>
          <button class="story-filter-chip ${story.lengthType === 'medium' ? 'active' : ''}" onclick="window.StoryController.filterStory('medium')">📖 Medium Stories</button>
          <button class="story-filter-chip ${story.lengthType === 'long' ? 'active' : ''}" onclick="window.StoryController.filterStory('long')">📚 Long Stories</button>
          <button class="story-filter-chip" onclick="window.StoryController.nextRandomStory()">🎲 Another Story</button>
        </div>

        <div class="story-header">
          <div class="story-header-left">
            <span class="story-emoji-huge">${story.emoji}</span>
            <div>
              <div class="story-title">${story.title}</div>
              <div class="story-meta">
                <span class="story-tag">${story.category}</span>
                <span class="story-length-pill ${lengthBadgeClass}">${lengthLabel}</span>
                <span class="story-time">⏱️ ${story.duration}</span>
              </div>
            </div>
          </div>
          <button class="story-audio-btn" onclick="window.StoryController.readStory('${story.id}')" title="Listen to Story with Kids Voice">
            🔊 Read Aloud
          </button>
        </div>

        <div class="story-body-text">
          ${story.content.replace(/\n\n/g, '<br><br>')}
        </div>

        <div class="story-moral-banner">
          <span>💡 <strong>Moral of the Story:</strong> ${story.moral}</span>
        </div>

        <!-- Interactive Comprehension Challenge Box -->
        <div class="comprehension-quiz-box">
          <div class="quiz-badge-header">
            <span>🎯 Story Comprehension Challenge</span>
          </div>
          <div class="quiz-question-text">
            ${story.quiz.question}
          </div>
          <div class="quiz-action-hint">
            🎙️ <em>Tap the microphone or type your answer in the chat box to get your score and listening badge!</em>
          </div>
        </div>
      </div>
    `;
  }

  // Render Evaluation Result Card
  renderEvaluationCard(evalData) {
    return `
      <div class="rich-widget-card story-eval-card ${evalData.status}">
        <div class="eval-header">
          <span class="eval-stars">${evalData.stars}</span>
          <span class="eval-badge-pill">${evalData.badge}</span>
        </div>

        <div class="eval-praise-text">
          ${evalData.praise}
        </div>

        <div class="eval-feedback-box">
          <strong>📝 Listening Feedback & Improvement:</strong>
          <p>${evalData.feedback}</p>
        </div>

        <div class="eval-fun-fact">
          <span>✨ <strong>Did You Know?</strong> ${evalData.funFact}</span>
        </div>
      </div>
    `;
  }
}

window.KidsStoryEngine = KidsStoryEngine;
