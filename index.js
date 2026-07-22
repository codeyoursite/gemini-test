import { pipeline, TextStreamer } from "https://cdn.jsdelivr.net/npm/@huggingface/transformers";

// Create a text generation pipeline
const generator = await pipeline(
  "text-generation",
  "HuggingFaceTB/SmolLM3-3B-Base"
);


const form = document.getElementById("form")
const txt = document.getElementById("txt")
let contents = null

form.addEventListener("submit", async (e) => {
    console.log("submit")
    e.preventDefault()

    contents = txt.value
    // Define the list of messages
    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: contents },
    ];
    
    // Create text streamer
    const streamer = new TextStreamer(generator.tokenizer, {
      skip_prompt: true
    });
    
    // Generate a response
    const result = await generator(messages, {
      max_new_tokens: 512,
      do_sample: false,
      streamer
    });

    document.getElementById("result").textContent = result[0].generated_text
})