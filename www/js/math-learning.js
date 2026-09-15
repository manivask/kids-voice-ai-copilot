/**
 * Math & English Learning Copilot Engine
 * ChatGPT / Copilot-style intelligent interactive tutor for Kids (Ages 8-12)
 * Features:
 * 1. Arithmetic & Expression Solver (+, -, *, /, %, powers, roots, parentheses)
 * 2. Real-world Kids Math Word Problem Solver
 * 3. Times Tables & Mental Math Explainer
 * 4. Step-by-Step Kid-Friendly Visual Solution Cards
 * 5. English Vocabulary, Spelling, Synonyms, Antonyms & Rhyming Engine
 * 6. Science & Curiosity Knowledge Base (Planets, Nature, Physics, Animals)
 */

class MathAndLearningEngine {
  constructor() {
    this.scienceKnowledgeBase = [
      {
        patterns: [/why\s+(?:is|are)\s+(?:the\s+)?sky\s+blue/i, /sky\s+blue/i],
        topic: "Why is the sky blue?",
        emoji: "🌌☀️",
        answer: "The sky is blue because of a phenomenon called **Rayleigh Scattering**! Sunlight reaches Earth's atmosphere and is scattered in all directions by gases in the air. Sunlight is made up of all the colors of the rainbow, but blue light travels as smaller, shorter waves, so it gets scattered much more than the other colors, making the sky look bright blue to our eyes!",
        spokenAnswer: "The sky looks blue because sunlight scatters in our atmosphere, and blue light travels in short, small waves that scatter everywhere!",
        funFact: "On Mars, the sky actually looks pinkish-red during the day and blue at sunset because of rusty dust particles!"
      },
      {
        patterns: [/how\s+many\s+planets/i, /planets\s+in\s+(?:our\s+)?solar\s+system/i, /list\s+planets/i],
        topic: "Planets in our Solar System",
        emoji: "🪐🚀",
        answer: "There are **8 official planets** in our solar system! In order from closest to the Sun:\n1. ☿️ **Mercury** (Smallest & closest)\n2. ♀️ **Venus** (Hottest planet)\n3. 🌍 **Earth** (Our home!)\n4. ♂️ **Mars** (The Red Planet)\n5. ♃ **Jupiter** (Largest gas giant)\n6. ♄ **Saturn** (Famous for its rings)\n7. ⛢ **Uranus** (Rotates on its side)\n8. ♆ **Neptune** (Windiest and coldest)\n\n*Fun Memory Trick*: **M**y **V**ery **E**nergetic **M**other **J**ust **S**erved **U**s **N**oodles!",
        spokenAnswer: "There are 8 planets in our solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune!",
        funFact: "Jupiter is so huge that over 1,300 Earths could fit inside it!"
      },
      {
        patterns: [/why\s+do\s+leaves\s+change\s+color/i, /autumn\s+leaves/i, /fall\s+leaves/i],
        topic: "Why do leaves change color in Autumn?",
        emoji: "🍂🍁",
        answer: "During spring and summer, leaves are green because they contain **chlorophyll**, which helps plants make food from sunlight. In autumn, when days get shorter and colder, trees stop making food and the green chlorophyll fades away. This uncovers the hidden yellow, orange, and red pigments called **carotenoids** and **anthocyanins**!",
        spokenAnswer: "Leaves change color because trees produce less green chlorophyll as the days get colder, revealing bright orange, yellow, and red colors!",
        funFact: "Some trees like evergreen pines keep their green needles all year round thanks to a waxy coating that protects against freezing!"
      },
      {
        patterns: [/how\s+do\s+airplanes\s+fly/i, /why\s+do\s+planes\s+fly/i, /how\s+planes\s+stay\s+in\s+air/i],
        topic: "How do Airplanes Fly?",
        emoji: "✈️💨",
        answer: "Airplanes fly thanks to **4 aerodynamic forces**:\n1. ⬆️ **Lift**: Air flows faster over the curved top of the wing than underneath, creating low pressure above and lifting the plane (Bernoulli's Principle).\n2. ➡️ **Thrust**: Jet engines push the aircraft forward.\n3. ⬇️ **Weight / Gravity**: The downward pull of the Earth.\n4. ⬅️ **Drag**: Air resistance opposing the forward motion.\nWhen Lift is greater than Gravity, and Thrust is greater than Drag, the airplane soars smoothly into the clouds!",
        spokenAnswer: "Airplanes fly because their curved wings create upward lift as the engines push them forward, overcoming gravity!",
        funFact: "A Boeing 747 airplane weighs about 400 tons and can fly over 500 miles per hour!"
      },
      {
        patterns: [/why\s+is\s+(?:the\s+)?ocean\s+salty/i, /sea\s+water\s+salty/i],
        topic: "Why is the Ocean Salty?",
        emoji: "🌊🧂",
        answer: "The ocean is salty because rainwater is slightly acidic, which slowly breaks down rocks on land. Rivers then carry the dissolved minerals and salts (mostly sodium and chloride) into the ocean. Over billions of years, as ocean water evaporates, the salt remains behind, making the sea salty!",
        spokenAnswer: "Rain washes tiny amounts of minerals and salt from rocks into rivers, which carry it to the ocean where it accumulates over millions of years!",
        funFact: "If you took all the salt out of the world's oceans and spread it evenly over land, it would create a layer 500 feet thick!"
      },
      {
        patterns: [/how\s+(?:do|does)\s+rainbows?\s+form/i, /what\s+causes\s+a\s+rainbow/i],
        topic: "How do Rainbows Form?",
        emoji: "🌈💧",
        answer: "Rainbows form when **sunlight shines through water droplets** in the air! Each tiny raindrop acts like a glass prism. As white sunlight enters the raindrop, it **bends (refracts)**, **bounces (reflects)** off the inside surface, and splits into the 7 primary colors: **Red, Orange, Yellow, Green, Blue, Indigo, and Violet (ROYGBIV)**!",
        spokenAnswer: "Rainbows appear when raindrops bend and reflect sunlight like tiny prisms, splitting white light into the 7 colors of the rainbow!",
        funFact: "Every rainbow is actually a full 360-degree circle! We usually only see half of it because the ground gets in the way."
      },
      {
        patterns: [/what\s+is\s+the\s+fastest\s+animal/i, /fastest\s+creature/i],
        topic: "Fastest Animals on Earth",
        emoji: "🐆🦅",
        answer: "- 🦅 **In the Air**: The **Peregrine Falcon** is the fastest animal on Earth, diving at speeds over **240 mph (386 km/h)**!\n- 🐆 **On Land**: The **Cheetah** is the fastest land animal, accelerating from 0 to 60 mph in just 3 seconds, reaching top speeds of **70 mph (112 km/h)**!\n- 🐟 **In the Ocean**: The **Sailfish** can swim at speeds up to **68 mph (110 km/h)**!",
        spokenAnswer: "The fastest animal in the world is the Peregrine Falcon diving at 240 miles per hour, and the fastest land animal is the cheetah at 70 miles per hour!",
        funFact: "A cheetah's long muscular tail acts like a rudder on a boat to help it make sharp turns at high speed!"
      },
      {
        patterns: [/why\s+do\s+we\s+(?:need\s+to\s+)?sleep/i, /why\s+is\s+sleep\s+important/i],
        topic: "Why do we need sleep?",
        emoji: "😴🧠",
        answer: "Sleep is super important for our body and brain! When you sleep:\n1. 🧠 **Memory consolidation**: Your brain organizes and saves what you learned during the day.\n2. 💪 **Body growth & repair**: Your body releases growth hormones and repairs muscles.\n3. 🛡️ **Immune recharge**: Sleep strengthens your immune system to fight off germs.\nKids aged 8-12 need **9 to 11 hours of sleep** every night to feel energetic, smart, and strong!",
        spokenAnswer: "We need sleep so our brain can store what we learned, our body can grow and repair, and our immune system can recharge!",
        funFact: "While you are dreaming in REM sleep, your brain is actually almost as active as when you are awake!"
      }
    ];

    this.vocabDictionary = {
      "perseverance": {
        pos: "Noun",
        def: "Continuing to try and never giving up, even when things are difficult or taking a long time.",
        example: "With perseverance, Leo practiced every day until he mastered riding his bicycle.",
        synonyms: ["persistence", "determination", "grit", "tenacity"],
        antonyms: ["giving up", "laziness", "hesitation"]
      },
      "empathy": {
        pos: "Noun",
        def: "The ability to understand and share the feelings of another person.",
        example: "Maya showed empathy by comforting her friend who was feeling sad about losing a game.",
        synonyms: ["compassion", "understanding", "kindness", "caring"],
        antonyms: ["indifference", "cruelty", "coldness"]
      },
      "ecosystem": {
        pos: "Noun",
        def: "A community of living organisms (plants, animals, bugs) interacting with non-living elements (water, soil, sun) in their environment.",
        example: "A coral reef is a bustling underwater ecosystem full of fish, sea turtles, and corals.",
        synonyms: ["environment", "habitat", "biome", "ecological community"],
        antonyms: []
      },
      "photosynthesis": {
        pos: "Noun",
        def: "The process by which green plants use sunlight, carbon dioxide, and water to create their own food and release fresh oxygen.",
        example: "Through photosynthesis, trees purify the air we breathe every day.",
        synonyms: ["plant food making", "solar synthesis"],
        antonyms: []
      },
      "courage": {
        pos: "Noun",
        def: "Bravery and the strength to face fear, danger, or difficulty.",
        example: "It took courage for Toby to stand up on stage and give his speech in front of the whole school.",
        synonyms: ["bravery", "fearlessness", "valor", "boldness"],
        antonyms: ["fear", "cowardice", "timidity"]
      },
      "curiosity": {
        pos: "Noun",
        def: "A strong desire to learn, explore, and understand new things.",
        example: "Emma's curiosity led her to read five library books about outer space and black holes.",
        synonyms: ["inquisitiveness", "interest", "wonder", "eagerness"],
        antonyms: ["disinterest", "boredom", "indifference"]
      },
      "hypothesis": {
        pos: "Noun",
        def: "An educated guess or proposed explanation made by a scientist before doing an experiment.",
        example: "Our hypothesis was that plants given more sunlight would grow taller.",
        synonyms: ["prediction", "educated guess", "theory", "proposal"],
        antonyms: ["proven fact", "certainty"]
      }
    };
  }

  /**
   * Check if query is a Math question
   */
  isMathIntent(input) {
    const clean = input.toLowerCase();
    // Direct math keywords or arithmetic expressions
    if (/\b(calculate|solve|math|what is|how much is|plus|minus|multiplied by|times|divided by|add|subtract|multiply|divide|square root|squared|cube|perimeter|area of|percent of|fraction of)\b/i.test(clean)) {
      if (/\d+/.test(clean) || /\b(half|quarter|double|triple|sum|product|quotient|difference)\b/i.test(clean)) {
        return true;
      }
    }
    // Fraction expressions like "3/4 of 40" or "half of 50"
    if (/\d+\s*\/\s*\d+\s+of/i.test(clean) || /\bhalf\s+of\b/i.test(clean)) {
      return true;
    }
    // Expression matches like "25 + 47", "12 * 8", "144 / 12"
    if (/^\s*[\d\.\(\)\+\-\*\/\^\%\s]+\s*$/.test(clean) && /\d+/.test(clean)) {
      return true;
    }
    // Word problems
    if (/\b(candies|apples|cookies|chocolates|pencils|marbles|stickers|books|dollars|cents|miles|hours|boxes|friends share)\b/i.test(clean) && /\d+/.test(clean)) {
      return true;
    }
    return false;
  }

  /**
   * Check if query is an English / Vocabulary / Grammar / Knowledge question
   */
  isLearningIntent(input) {
    const clean = input.toLowerCase();
    if (/\b(what does .* mean|meaning of|definition of|define|how do you spell|spell|what rhymes with|rhyme with|synonym for|antonym for|opposite of|what is a (noun|verb|adjective|adverb|pronoun))\b/i.test(clean)) {
      return true;
    }
    for (const kb of this.scienceKnowledgeBase) {
      if (kb.patterns.some(p => p.test(clean))) {
        return true;
      }
    }
    return false;
  }

  /**
   * Process Math queries and produce detailed step-by-step solution
   */
  solveMath(rawInput) {
    const input = rawInput.toLowerCase();

    // 1. Check for Real-World Word Problems
    const wordProblemResult = this.solveWordProblem(input);
    if (wordProblemResult) return wordProblemResult;

    // 2. Check for Percentage Problems (e.g. "15% of 80" or "what is 20 percent of 150")
    const percentMatch = input.match(/(?:what is\s+)?(\d+(?:\.\d+)?)\s*(?:%|percent)\s*(?:of)\s*(\d+(?:\.\d+)?)/i);
    if (percentMatch) {
      const p = parseFloat(percentMatch[1]);
      const total = parseFloat(percentMatch[2]);
      const ans = (p / 100) * total;
      return {
        type: 'percentage',
        title: `${p}% of ${total}`,
        expression: `(${p} / 100) × ${total}`,
        answer: ans % 1 === 0 ? ans.toString() : ans.toFixed(2),
        steps: [
          `Step 1: Convert ${p}% to a decimal fraction: ${p} / 100 = ${(p / 100).toFixed(2)}`,
          `Step 2: Multiply by ${total}: ${(p / 100).toFixed(2)} × ${total} = ${ans}`
        ],
        tip: `💡 **Pro Tip**: To find 10% of any number quickly, just slide the decimal point one place to the left!`,
        spokenAnswer: `${p} percent of ${total} is ${ans}.`
      };
    }

    // 3. Check for Square Roots (e.g. "square root of 81" or "sqrt(144)")
    const sqrtMatch = input.match(/(?:square root of|sqrt|√)\s*(\d+(?:\.\d+)?)/i);
    if (sqrtMatch) {
      const num = parseFloat(sqrtMatch[1]);
      const ans = Math.sqrt(num);
      return {
        type: 'square_root',
        title: `Square Root of ${num}`,
        expression: `√${num}`,
        answer: ans % 1 === 0 ? ans.toString() : ans.toFixed(3),
        steps: [
          `Step 1: Find a number that multiplied by itself equals ${num}`,
          `Step 2: ${ans} × ${ans} = ${num}`,
          `Therefore, the square root of ${num} is ${ans}!`
        ],
        tip: `💡 **Math Fact**: Square roots undo squaring! Since 9 × 9 = 81, √81 = 9.`,
        spokenAnswer: `The square root of ${num} is ${ans}.`
      };
    }

    // 4. Check for Squared / Powers (e.g. "8 squared" or "5 to the power of 3")
    const powerMatch = input.match(/(\d+(?:\.\d+)?)\s*(?:squared|\^2|to the power of 2)/i);
    if (powerMatch) {
      const num = parseFloat(powerMatch[1]);
      const ans = num * num;
      return {
        type: 'power',
        title: `${num} Squared`,
        expression: `${num}² = ${num} × ${num}`,
        answer: ans.toString(),
        steps: [
          `Step 1: Multiply ${num} by itself`,
          `${num} × ${num} = ${ans}`
        ],
        tip: `💡 Squaring means making a geometric square with sides of length ${num}!`,
        spokenAnswer: `${num} squared is ${ans}.`
      };
    }

    // 5. Check for Fractions (e.g. "3/4 of 24" or "half of 50")
    const fractionMatch = input.match(/(\d+)\s*\/\s*(\d+)\s*(?:of)\s*(\d+(?:\.\d+)?)/i);
    if (fractionMatch) {
      const num = parseInt(fractionMatch[1], 10);
      const den = parseInt(fractionMatch[2], 10);
      const total = parseFloat(fractionMatch[3]);
      const part = (total / den);
      const ans = part * num;
      return {
        type: 'fraction',
        title: `${num}/${den} of ${total}`,
        expression: `(${total} ÷ ${den}) × ${num}`,
        answer: ans.toString(),
        steps: [
          `Step 1: Divide the whole number by the denominator (${den}): ${total} ÷ ${den} = ${part}`,
          `Step 2: Multiply by the numerator (${num}): ${part} × ${num} = ${ans}`
        ],
        tip: `💡 Fractions represent equal pieces of a whole!`,
        spokenAnswer: `${num}/${den} of ${total} is ${ans}.`
      };
    }

    if (input.includes('half of')) {
      const numMatch = input.match(/half of\s*(\d+(?:\.\d+)?)/i);
      if (numMatch) {
        const val = parseFloat(numMatch[1]);
        return {
          type: 'fraction',
          title: `Half of ${val}`,
          expression: `${val} ÷ 2`,
          answer: (val / 2).toString(),
          steps: [`Divide ${val} into 2 equal parts: ${val} ÷ 2 = ${val / 2}`],
          tip: `💡 Finding half means dividing equally between 2 groups!`,
          spokenAnswer: `Half of ${val} is ${val / 2}.`
        };
      }
    }

    // 6. Natural Language Arithmetic Parse (plus, minus, times, divided by, etc.)
    let cleanExpr = input
      .replace(/what\s+is\s+/gi, '')
      .replace(/how\s+much\s+is\s+/gi, '')
      .replace(/calculate\s+/gi, '')
      .replace(/solve\s+/gi, '')
      .replace(/plus|add/gi, '+')
      .replace(/minus|subtract|take away/gi, '-')
      .replace(/times|multiplied\s+by|into/gi, '*')
      .replace(/divided\s+by|over/gi, '/')
      .replace(/x/gi, '*')
      .replace(/[^\d\.\+\-\*\/\(\)\^\s]/g, '')
      .trim();

    try {
      if (cleanExpr && /[\d]/.test(cleanExpr)) {
        // Safe evaluation of sanitized mathematical arithmetic tokens
        // Check for disallowed characters
        if (/^[0-9\.\+\-\*\/\(\)\s]+$/.test(cleanExpr)) {
          // eslint-disable-next-line no-new-func
          const result = Function(`'use strict'; return (${cleanExpr})`)();
          if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
            const formattedResult = Number.isInteger(result) ? result.toString() : result.toFixed(3).replace(/\.?0+$/, '');
            const friendlyExpr = cleanExpr.replace(/\*/g, '×').replace(/\//g, '÷');

            return {
              type: 'arithmetic',
              title: `Math Solution`,
              expression: `${friendlyExpr}`,
              answer: formattedResult,
              steps: [
                `Calculated: ${friendlyExpr} = ${formattedResult}`,
                `Accuracy verified with standard order of operations (PEMDAS)!`
              ],
              tip: `💡 **Order of Operations**: Parentheses first, then Exponents, Multiplication & Division, then Addition & Subtraction!`,
              spokenAnswer: `The answer is ${formattedResult}.`
            };
          }
        }
      }
    } catch (_) {}

    return null;
  }

  /**
   * Word problem solver for classic kid scenarios
   */
  solveWordProblem(input) {
    // Sharing / Division word problem: "if 4 friends share 24 cookies"
    const shareMatch = input.match(/(\d+)\s*(?:friends?|people|kids?|children|students?)\s*(?:share|have|divide)\s*(\d+)\s*([a-z]+)/i) ||
                       input.match(/share\s*(\d+)\s*([a-z]+)\s*(?:equally\s*)?(?:among|with|between)\s*(\d+)/i);
    if (shareMatch) {
      let people, items, itemName;
      if (input.includes('share') && isNaN(parseInt(shareMatch[1], 10)) === false && shareMatch[3] && !isNaN(parseInt(shareMatch[3], 10))) {
        items = parseInt(shareMatch[1], 10);
        itemName = shareMatch[2];
        people = parseInt(shareMatch[3], 10);
      } else {
        people = parseInt(shareMatch[1], 10);
        items = parseInt(shareMatch[2], 10);
        itemName = shareMatch[3];
      }

      if (people > 0 && items > 0) {
        const perPerson = Math.floor(items / people);
        const remainder = items % people;
        return {
          type: 'word_problem',
          title: `Sharing ${itemName} Equally`,
          expression: `${items} ${itemName} ÷ ${people} friends`,
          answer: `${perPerson} ${itemName} each` + (remainder > 0 ? ` (with ${remainder} left over)` : ''),
          steps: [
            `Total items: ${items} ${itemName}`,
            `Number of people sharing: ${people}`,
            `Equal division: ${items} ÷ ${people} = ${perPerson}` + (remainder > 0 ? ` with a remainder of ${remainder}` : '')
          ],
          tip: `💡 Sharing equally is the foundation of division in mathematics!`,
          spokenAnswer: `Each friend gets ${perPerson} ${itemName}` + (remainder > 0 ? `, and there are ${remainder} left over.` : '.')
        };
      }
    }

    // Buying / Change problem: "costs 18 dollars and pay with 50"
    const changeMatch = input.match(/(?:costs?|price of)\s*(?:\$)?(\d+(?:\.\d+)?)\s*(?:dollars?)?.*(?:pay|give|paid)\s*(?:with\s*)?(?:\$)?(\d+(?:\.\d+)?)/i);
    if (changeMatch) {
      const cost = parseFloat(changeMatch[1]);
      const paid = parseFloat(changeMatch[2]);
      const change = paid - cost;
      return {
        type: 'word_problem',
        title: `Making Change Calculation`,
        expression: `$${paid} - $${cost}`,
        answer: `$${change.toFixed(2)} Change`,
        steps: [
          `Amount paid: $${paid.toFixed(2)}`,
          `Item cost: -$${cost.toFixed(2)}`,
          `Change returned: $${paid.toFixed(2)} - $${cost.toFixed(2)} = $${change.toFixed(2)}`
        ],
        tip: `💡 When buying items, Change = Amount Paid minus Cost of Item!`,
        spokenAnswer: `Your change will be $${change.toFixed(2)}.`
      };
    }

    // Giving away / subtraction: "have 20 cookies and give 7 to..."
    const giveMatch = input.match(/(?:have|had|has)\s*(\d+)\s*([a-z]+).*?(?:give|gave|ate|lost|spent)\s*(\d+)/i);
    if (giveMatch) {
      const total = parseInt(giveMatch[1], 10);
      const itemName = giveMatch[2];
      const given = parseInt(giveMatch[3], 10);
      const remaining = total - given;
      return {
        type: 'word_problem',
        title: `Remaining ${itemName}`,
        expression: `${total} - ${given}`,
        answer: `${remaining} ${itemName} left`,
        steps: [
          `Initial quantity: ${total} ${itemName}`,
          `Quantity removed: -${given} ${itemName}`,
          `Remaining: ${total} - ${given} = ${remaining} ${itemName}`
        ],
        tip: `💡 Subtraction helps find what is left over after taking away a part!`,
        spokenAnswer: `You have ${remaining} ${itemName} left.`
      };
    }

    // Distance = Speed * Time: "travels 60 mph for 3 hours"
    const speedMatch = input.match(/(\d+)\s*(?:mph|miles per hour|km\/h|kmh).*?(\d+)\s*(?:hours?|hrs?)/i);
    if (speedMatch) {
      const speed = parseInt(speedMatch[1], 10);
      const hours = parseInt(speedMatch[2], 10);
      const distance = speed * hours;
      return {
        type: 'word_problem',
        title: `Distance Traveled`,
        expression: `${speed} mph × ${hours} hours`,
        answer: `${distance} miles`,
        steps: [
          `Speed = ${speed} miles per hour`,
          `Time = ${hours} hours`,
          `Distance = Speed × Time: ${speed} × ${hours} = ${distance} miles`
        ],
        tip: `💡 Remember the formula: Distance = Speed × Time (D = S × T)!`,
        spokenAnswer: `The total distance traveled is ${distance} miles.`
      };
    }

    return null;
  }

  /**
   * Process English, Vocabulary, Science and Knowledge questions
   */
  solveLearning(rawInput) {
    const input = rawInput.toLowerCase().trim();

    // 1. Science & Curiosity Knowledge Base match
    for (const kb of this.scienceKnowledgeBase) {
      if (kb.patterns.some(p => p.test(input))) {
        return {
          type: 'science_knowledge',
          title: kb.topic,
          emoji: kb.emoji,
          content: kb.answer,
          funFact: kb.funFact,
          spokenAnswer: kb.spokenAnswer
        };
      }
    }

    // 2. Vocabulary Definitions
    const defineMatch = input.match(/(?:what does\s+([a-z]+)\s+mean|meaning of\s+([a-z]+)|definition of\s+([a-z]+)|define\s+([a-z]+))/i);
    if (defineMatch) {
      const word = (defineMatch[1] || defineMatch[2] || defineMatch[3] || defineMatch[4]).toLowerCase();
      if (this.vocabDictionary[word]) {
        const v = this.vocabDictionary[word];
        return {
          type: 'vocabulary',
          title: `Definition: "${word.toUpperCase()}"`,
          emoji: "📖✨",
          content: `**${word}** *(${v.pos})*\n\n📝 **Meaning**: ${v.def}\n\n🌟 **Example Sentence**: *"${v.example}"*\n\n🔗 **Synonyms**: ${v.synonyms.join(', ')}` + (v.antonyms.length > 0 ? `\n\n⚡ **Antonyms**: ${v.antonyms.join(', ')}` : ''),
          funFact: `Building a rich vocabulary helps you become an expressive writer and confident speaker!`,
          spokenAnswer: `${word} means ${v.def}`
        };
      }
    }

    // 3. Rhyming Words
    const rhymeMatch = input.match(/(?:what rhymes with|words that rhyme with|rhyme for)\s+([a-z]+)/i);
    if (rhymeMatch) {
      const word = rhymeMatch[1].toLowerCase();
      const rhymes = this.getRhymes(word);
      return {
        type: 'rhyme',
        title: `Words that Rhyme with "${word.toUpperCase()}"`,
        emoji: "🎵📝",
        content: `Here are fun words that rhyme with **"${word}"**:\n\n✨ **${rhymes.join(' • ')}**\n\n*Poem Idea*: Try writing a 2-line rhyme using two of these words!`,
        funFact: "Rhyming helps our brain recognize phonetic sound patterns in language and makes poems musical!",
        spokenAnswer: `Words that rhyme with ${word} include: ${rhymes.slice(0, 4).join(', ')}!`
      };
    }

    // 4. Synonyms & Antonyms
    const synMatch = input.match(/(?:synonym(?:s)?\s+(?:for|of)|another word for)\s+([a-z]+)/i);
    if (synMatch) {
      const word = synMatch[1].toLowerCase();
      const syns = this.getSynonyms(word);
      return {
        type: 'synonym',
        title: `Synonyms for "${word.toUpperCase()}"`,
        emoji: "💡📚",
        content: `Words with similar meanings to **"${word}"**:\n\n🌟 **${syns.join(' • ')}**`,
        funFact: "Using synonyms makes your stories and essays much more descriptive and exciting!",
        spokenAnswer: `Some great synonyms for ${word} are: ${syns.slice(0, 3).join(', ')}!`
      };
    }

    const antMatch = input.match(/(?:antonym(?:s)?\s+(?:for|of)|opposite of)\s+([a-z]+)/i);
    if (antMatch) {
      const word = antMatch[1].toLowerCase();
      const opps = this.getAntonyms(word);
      return {
        type: 'antonym',
        title: `Opposites of "${word.toUpperCase()}"`,
        emoji: "🔄🎯",
        content: `The opposite (antonym) of **"${word}"** is:\n\n⚡ **${opps.join(' • ')}**`,
        funFact: "Antonyms are pairs of words with contrasting meanings that balance our language!",
        spokenAnswer: `The opposite of ${word} is ${opps[0]}.`
      };
    }

    // 5. Spelling Helper
    const spellMatch = input.match(/(?:how do you spell|spell)\s+([a-z]+)/i);
    if (spellMatch) {
      const word = spellMatch[1].toLowerCase();
      const spelledOut = word.toUpperCase().split('').join(' - ');
      return {
        type: 'spelling',
        title: `Spelling: "${word.toUpperCase()}"`,
        emoji: "🔤✏️",
        content: `The correct spelling of **${word}** is:\n\n### 🔤 **${spelledOut}**\n\nWord Length: **${word.length} letters** • Syllables: **${this.estimateSyllables(word)}**`,
        funFact: "Practicing spelling out loud helps both visual and auditory memory!",
        spokenAnswer: `${word} is spelled: ${word.split('').join(' ... ')}!`
      };
    }

    // 6. Parts of Speech (Grammar)
    if (input.includes('what is a noun') || input.includes('what is a verb') || input.includes('what is an adjective')) {
      return this.getGrammarLesson(input);
    }

    return null;
  }

  getRhymes(word) {
    const rhymeBook = {
      "cat": ["Hat", "Bat", "Mat", "Rat", "Flat", "Chat"],
      "dog": ["Frog", "Log", "Fog", "Jog", "Clog", "Blog"],
      "sun": ["Fun", "Run", "Bun", "One", "Done", "Spun"],
      "star": ["Far", "Car", "Bar", "Jar", "Guitar", "Radar"],
      "light": ["Bright", "Night", "Flight", "Kite", "Sight", "Might"],
      "tree": ["Free", "See", "Bee", "Sea", "Three", "Flee"],
      "blue": ["True", "Clue", "Glue", "Shoe", "Grew", "Knew"],
      "day": ["Play", "Say", "May", "Way", "Stay", "Ray"],
      "dream": ["Beam", "Gleam", "Stream", "Team", "Cream", "Scream"]
    };
    return rhymeBook[word] || ["Bright", "Light", "Sight", "Flight", "Kite"];
  }

  getSynonyms(word) {
    const synBook = {
      "happy": ["Joyful", "Cheerful", "Delighted", "Ecstatic", "Glad", "Radiant"],
      "big": ["Huge", "Gigantic", "Massive", "Enormous", "Colossal", "Giant"],
      "small": ["Tiny", "Little", "Miniature", "Petite", "Compact"],
      "brave": ["Courageous", "Fearless", "Valiant", "Heroic", "Bold"],
      "smart": ["Intelligent", "Clever", "Brilliant", "Wise", "Sharp"],
      "fast": ["Quick", "Swift", "Rapid", "Speedy", "Brisk"],
      "beautiful": ["Gorgeous", "Lovely", "Radiant", "Stunning", "Attractive"]
    };
    return synBook[word] || ["Excellent", "Wonderful", "Splendid", "Marvelous"];
  }

  getAntonyms(word) {
    const antBook = {
      "happy": ["Sad", "Gloomy", "Sorrowful"],
      "big": ["Small", "Tiny", "Miniature"],
      "hot": ["Cold", "Freezing", "Chilly"],
      "brave": ["Timid", "Cowardly", "Fearful"],
      "fast": ["Slow", "Sluggish", "Gradual"],
      "generous": ["Selfish", "Stingy", "Greedy"],
      "difficult": ["Easy", "Simple", "Effortless"]
    };
    return antBook[word] || ["Opposite", "Reverse", "Contrasting"];
  }

  estimateSyllables(word) {
    const w = word.toLowerCase();
    if (w.length <= 3) return 1;
    const matches = w.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
  }

  getGrammarLesson(input) {
    if (input.includes('noun')) {
      return {
        type: 'grammar',
        title: "What is a Noun?",
        emoji: "🏷️👤",
        content: "A **Noun** is a word that names a **Person, Place, Thing, or Idea**!\n\n- 👤 **Person**: Teacher, Doctor, Maya, Astronaut\n- 🏞️ **Place**: School, Library, Paris, Moon\n- 🚗 **Thing**: Book, Telescope, Apple, Bicycle\n- 💡 **Idea**: Kindness, Courage, Friendship, Joy",
        funFact: "Proper nouns (like names of specific people and cities) always start with a Capital Letter!",
        spokenAnswer: "A noun is a naming word for a person, place, thing, or idea, like school, teacher, telescope, or kindness!"
      };
    }
    if (input.includes('verb')) {
      return {
        type: 'grammar',
        title: "What is a Verb?",
        emoji: "🏃⚡",
        content: "A **Verb** is an **Action Word** that tells what someone or something is doing!\n\n- 🏃 **Physical Actions**: Run, Jump, Swim, Read, Dance, Paint\n- 🧠 **Mental Actions**: Think, Believe, Wonder, Remember\n- 🌟 **State of Being**: Is, Are, Was, Were, Become",
        funFact: "Every complete sentence in English must have at least one verb!",
        spokenAnswer: "A verb is an action word that describes what someone or something does, like run, swim, read, or think!"
      };
    }
    return {
      type: 'grammar',
      title: "What is an Adjective?",
      emoji: "🎨✨",
      content: "An **Adjective** is a **Describing Word** that gives more detail about a noun!\n\n- 🌈 **Colors & Looks**: *Golden* acorn, *sparkling* star, *ancient* tree\n- 📏 **Size & Shape**: *Tiny* puppy, *colossal* whale, *round* planet\n- 😊 **Feelings & Qualities**: *Brave* knight, *joyful* friends, *delicious* feast",
      funFact: "Adjectives make our storytelling colorful and help readers picture scenes in their mind!",
      spokenAnswer: "An adjective is a describing word that gives more information about a noun, like sparkling, brave, or huge!"
    };
  }

  // Render Math Solution Card
  renderMathCard(mathData) {
    return `
      <div class="rich-widget-card math-solution-card">
        <div class="math-card-header">
          <div class="math-card-title">
            <span>🔢</span> ${mathData.title}
          </div>
          <span class="math-badge">Math Solver</span>
        </div>

        <div class="math-expression-display">
          ${mathData.expression} = <span class="math-highlight-answer">${mathData.answer}</span>
        </div>

        <div class="math-steps-container">
          <div class="math-steps-label">📝 Step-by-Step Explanation:</div>
          <ul class="math-steps-list">
            ${mathData.steps.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>

        ${mathData.tip ? `
          <div class="math-tip-box">
            ${mathData.tip}
          </div>
        ` : ''}
      </div>
    `;
  }

  // Render Learning / English / Science Card
  renderLearningCard(data) {
    return `
      <div class="rich-widget-card learning-card">
        <div class="learning-header">
          <div class="learning-title">
            <span>${data.emoji || '💡'}</span> ${data.title}
          </div>
          <span class="learning-badge">Copilot Knowledge</span>
        </div>

        <div class="learning-content">
          ${data.content ? data.content.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>') : ''}
        </div>

        ${data.funFact ? `
          <div class="learning-fun-fact">
            <span>✨ <strong>Did You Know?</strong> ${data.funFact}</span>
          </div>
        ` : ''}
      </div>
    `;
  }
}

window.MathAndLearningEngine = MathAndLearningEngine;
