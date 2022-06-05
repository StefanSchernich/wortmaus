const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../client/build")));

mongoose
	.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.87bkb.mongodb.net/WortmausDB?retryWrites=true&w=majority`)
	.then(() => console.log("Successfully connected to Wortmaus DB"))
	.catch((err) => console.error(err));

const wordSchema = new mongoose.Schema({
	word: { type: String, required: true, unique: true },
});

const Word = mongoose.model("Word", wordSchema);

// GOOGLE TRANSLATE API

const projectId = "elliptical-rite-351613";
const CREDS = JSON.parse(process.env.GOOGLE_CREDENTIALS);

// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate").v2;

// Instantiates a client
const translate = new Translate({
	projectId,
	credentials: CREDS,
});

async function translateTo(source, targetLanguage) {
	// The text to translate
	const text = source;

	// The target language
	const target = targetLanguage;
	// console.log(`sourcetext: ${text}, targetLanguage: ${target}`)

	// Translates some text into target language
	const [translation] = await translate.translate(text, target);
	// console.log(`Text: ${text}`);
	// console.log(`Translation: ${translation}`);
	return translation;
}

// ROUTES

app.get("/getWord", async (req, res) => {
	const count = await Word.count();
	// console.log(`count: ${count}`)
	const random = Math.floor(Math.random() * count);
	const { word } = await Word.findOne().skip(random).exec();
	// console.log(`selected word: ${word}`)
	// console.log(`übersetzt von Google: ${translateTo(word, 'en')}`)
	return res.json(word);
});

app.post("/translate", async (req, res) => {
	console.log("body", req.body);
	const { word, selectedLanguage } = req.body;
	const translation = await translateTo(word, selectedLanguage);
	console.log(`word: ${word}, selectedLangugage: ${selectedLanguage}, Google translation: ${translation}`);
	return res.json({ translation });
});

app.post("/addWord", async (req, res) => {
	const { newWord } = req.body;
	const { word: addedWord } = await Word.create({ word: newWord });
	return res.json({ addedWord });
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(
		`server listening on port ${PORT},
  __dirname is ${__dirname},
  working directory is ${process.cwd()}`
	);
});
