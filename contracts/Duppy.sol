// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

// We need to import the helper functions from the contract that we copy/pasted.
import {Base64} from "./libraries/Base64.sol";

contract Duppy is ERC721URIStorage {
    // OpenZeppelin to help us keep track of tokenIds.
    // the 'using' directive keyword is for libraries i.e. counters
    // Provides counters that can only be incremented, decremented or reset. This can be used e.g. to track the number of elements in a mapping, issuing ERC721 ids, or counting request ids

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 public totalSupply;

    // This is our SVG code. All we need to change is the word that's displayed. Everything else stays the same.
    // So, we make a baseSvg variable here that all our NFTs can use.
    string baseSvg =
        "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    // I create three arrays, each with their own theme of random words.
    // Pick some random funny words, names of anime characters, foods you like, whatever!
    string[] firstWords = [
        "CheGuevaras",
        "Vaders",
        "ThePopes",
        "Ronaldos",
        "Adeles",
        "Bilbos",
        "Ghandis",
        "Drakes",
        "TaylorSwifts",
        "Thors",
        "Kanyes",
        "Kims",
        "Gandalfs",
        "SteveBruces",
        "Ninjas",
        "Flokis",
        "Homers",
        "Lizzies",
        "Eminems",
        "Chappelles"
    ];
    string[] secondWords = [
        "Cotton",
        "Polished",
        "Ossified",
        "Microscopic",
        "Paranormal",
        "Persian",
        "Militant",
        "Odious",
        "Immaculate",
        "Pungent",
        "Parsimonious",
        "HamFisted",
        "Transmoglified",
        "Shiny",
        "Eccentric",
        "Damp",
        "Nondescript",
        "Elaborate",
        "Oversized",
        "PigHeaded"
    ];
    string[] thirdWords = [
        "Otter",
        "Stapler",
        "Candle",
        "MoneyPlant",
        "Mouse",
        "Sieve",
        "FoamRoller",
        "Box",
        "Cupboard",
        "Database",
        "Airpods",
        "Pencil",
        "Coffee",
        "Lawnmower",
        "Mask",
        "Spoon",
        "Dessert",
        "Calculator",
        "Slippers",
        "Henhouse"
    ];

    // // Add a limit to the number of NFT's the contract can mint (limited edition)
    // uint256 public constant collectionLimit = 50;

    event NFTMinted(address sender, uint256 tokenID);

    // We need to pass the name of our NFTs token and it's symbol.
    constructor(uint256 _totalSupply) ERC721("DuppyNFT", "DUPPY") {
        console.log("DUPPY NFT constructor");
        totalSupply = _totalSupply;
    }

    // Limited edition modifier
    modifier limitedEdition() {
        require(
            _tokenIds.current() < totalSupply,
            "Limited Edition NFT, no more available!"
        );
        _;
    }

    function pickRandomFirstWord(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        // I seed the random generator. More on this in the lesson.
        uint256 rand = random(
            string(abi.encodePacked("FIRST_WORD", Strings.toString(tokenId)))
        );
        // Squash the # between 0 and the length of the array to avoid going out of bounds.
        rand = rand % firstWords.length;
        console.log("The 1st random number generated: %s", rand);
        return firstWords[rand];
    }

    function pickRandomSecondWord(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("SECOND_WORD", Strings.toString(tokenId)))
        );
        rand = rand % secondWords.length;
        console.log("The 2nd random number generated: %s", rand);
        return secondWords[rand];
    }

    function pickRandomThirdWord(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("THIRD_WORD", Strings.toString(tokenId)))
        );
        rand = rand % thirdWords.length;
        console.log("The third random number generated: %s", rand);
        return thirdWords[rand];
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    function makeAnEpicNFT() public limitedEdition {
        uint256 newItemId = _tokenIds.current();

        // We go and randomly grab one word from each of the three arrays.
        string memory first = pickRandomFirstWord(newItemId);
        string memory second = pickRandomSecondWord(newItemId);
        string memory third = pickRandomThirdWord(newItemId);

        string memory combinedWord = string(
            abi.encodePacked(first, second, third)
        );

        // I concatenate it all together, and then close the <text> and <svg> tags.
        string memory finalSvg = string(
            abi.encodePacked(baseSvg, first, second, third, "</text></svg>")
        );

        // Get all the JSON metadata in place and base64 encode it.
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        // We set the title of our NFT as the generated word.
                        combinedWord,
                        '", "description": "A highly acclaimed collection of squares.", "image": "data:image/svg+xml;base64,',
                        // We add data:image/svg+xml;base64 and then append our base64 encode our svg.
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );

        // prepend data:application/json;base64, to json data.
        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        _safeMint(msg.sender, newItemId);

        // Set the tokenURI ()
        _setTokenURI(newItemId, finalTokenUri);

        _tokenIds.increment();
        console.log(
            "An NFT w/ ID %s (of %s) has been minted to %s",
            newItemId,
            totalSupply,
            msg.sender
        );

        emit NFTMinted(msg.sender, newItemId);
    }

    function getMintedAmount()
        public
        view
        returns (uint256 currentMint, uint256 limit)
    {
        console.log(
            "we have minted %s NFT's in total so far out of %s",
            _tokenIds.current(),
            totalSupply
        );
        return (_tokenIds.current(), totalSupply);
    }
}
