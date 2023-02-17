function getBotResponse(input) {
    //dobar dan dobra vecer laku noc
    if (input == "dobar dan") {
        return "dobar dan";
    } else if (input == "dobar dan") {
        return "dobra vecer";
    } else if (input == "dobra vecer") {
        return "dobar vecer";
    }

    // Simple responses
    if (input == "") {
        return "Hey!";
    } else if (input == "goodbye") {
        return "Cujemo se kasnije!";
    } else {
        return "Pitaj me nesto drugo!";
    }
}