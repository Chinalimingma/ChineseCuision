'use strict';

var help = require("./help");
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var crispy = require('crispy-string');
var mongoose = require('mongoose');
var Menu = require("../models/menu");

var picfile="250_250.png";
var seasoningsArray = [
         {description: "Salt", quantity: 1/2}  
        ,{description: "Sugar", quantity: 1/2}
        ,{description: "Vinegar", quantity: 2}
        ,{description: "Cooking Oil", quantity: 2}
        ,{description: "Peanuts Oil", quantity: 1}
        ,{description: "Sesame Oil", quantity: 1}
        ,{description: "Chili Oil", quantity: 1}
        ,{description: "Soy Sauce", quantity: 1}
        ,{description: "Cook Wine", quantity: ""}
        ,{description: "Five spicy powder", quantity: 1}
        ,{description: "Pepper powder", quantity: 1}
        ,{description: "Starch", quantity: 1}
        ,{description: "Broth", quantity: ""}
    ];
var ingredientsArray =[
        {description: "Garlic", quantity: 3}  
        ,{description: "Ginger", quantity: 2}
        ,{description: "Onion", quantity: 2}
        ,{description: "Scallion", quantity: 2}
        ,{description: "Coriander", quantity: 2}
        ,{description: "Zhaicai", quantity: 2}
        ,{description: "Pepper", quantity: 2}
        ,{description: "Cinnamon", quantity: 2}
        ,{description: "Bay leaf", quantity: 2}
        ,{description: "Hot pepper", quantity: 2}
        ,{description: "Sichuan Bean Paste", quantity: ""}   
     ];
var mainIngredientsArray =[
        {description: "Rice", quantity: 3}  
        ,{description: "Flour", quantity: 2}
        ,{description: "Tofu", quantity: 2}
        ,{description: "Vegetables", quantity: 2}
        ,{description: "Egg White", quantity: ""}
        ,{description: "Meat", quantity: 2}
     ];

var noodle = new Recipe({
    dishName: "Hot and Sour Potato Noodles",
	CookTime: 5,
    comments: ["One of the most famous Sichuan style hot and sour sweet potato noodles." , 
    "This hot and sour sweet potato noodle is the most common and super yummy Chinese street food."],
    seasonings:seasoningsArray,
    ingredients:ingredientsArray,
    mainIngredients:mainIngredientsArray,
    Instructions: [
        "1. Soak the sweet potato noodles with enough water until soft. Transfer out and set aside.",
        "2. In the serving bowls and mix all the seasonings. Heat up peanuts oil in pan to stir-fry the mashed garlic until aroma.",
        "Mix the garlic oil with Sichuan pepper, red oil, Chinese five spice powder, green onion, coriander, light soy sauce, black vinegar and salt in serving bowls.",
        "3. Cook soaked sweet potato noodles around 5-8 minutes until you can break the noodles (or follow the instruction on the package).",
        " Transfer the noodles out to the serving bowls and then add top with pickled vegetables, roasted peanuts and chopped spring onions and coriander. Serve hot!"
    ],
	pics: [
        {file: picfile, url: help.generateURLForRecipePic(picfile)}
    ],
    _creator:John._id
});

var mapoTofu = new Recipe({
    dishName: "MapoTofu",
	CookTime: 5,
    comments:
    ["This famous Mapo Tofu is the most common and super yummy Chinese street food."],
    seasonings:seasoningsArray,
    ingredients:ingredientsArray,
    mainIngredients:mainIngredientsArray,
    Instructions: [
        "1. Add a small pinch of salt and sesame oil to minced beef. Mix well and set aside.",
        "2. Mix 1 tablespoon of cornstarch with 2 and 1/2 tablespoons of water in a small bowl to make water starch.",
        "3. Cut tofu into square cubes (around 2cms). Bring a large amount of water to a boil and then add a pinch of salt. Slide the tofu in and cook for 1 minute. Move out and drain.",
        "4. Get a wok and heat up around 2 tablespoons of oil, fry the minced meat until crispy. Transfer out beef out and leave the oil in.",
        "5. Fry doubanjiang for 1 minute over slow fire and then add garlic, scallion white, ginger and fermented black beans to cook for 30 seconds until aroma. Then mix pepper flakes in.",
        "6. Add water to the seasonings and bring to boil over high fire. Gently slide the tofu cubes. Add light soy sauce and beef.Slow the heat after boiling and then simmer for 6-8 minutes. Then add chopped garlic greens.",
        "7. Stir the water starch and then pour half of the mixture to the simmering pot. Wait for around 30 seconds and then pour the other half. You can slightly taste the tofu and add pinch of salt if not salty enough. By the way, if you feel it is too spicy, add some sugar can milden the taste. But be carefully as the broth is very hot at this point.",
        "8. Transfer out when almost all the seasonings stick to tofu cubes. Sprinkle Szechuan peppercorn powder (to taste)and chopped garlic greens if using.",
        "9. Serve immediately with steamed rice."
        ],
	pics: [
        {file: picfile, url: help.generateURLForRecipePic(picfile)}
    ],
    _creator:John._id
});

var tomatoFish = new Recipe({
    dishName: "Tomato Fish",
	CookTime: 30,
    comments: ["A mild Sichuan style water boiled fish--Chinese tomato fish is a new rising star in Sichuan cuisine especially in warm days."],
    seasonings:seasoningsArray,
    ingredients:ingredientsArray,
    mainIngredients:mainIngredientsArray,
    Instructions: [
        "1. Add starch, cooking wine, spring onion whites, ginger, ground pepper, egg white and salt. Marinate the fish meat for around 1 hour.",
        "2. Peel the tomato and them cut into small dices. Heat around 2 tablespoons of cooking oil in wok or pot, fry green onion and garlic until aroma. Add diced tomato and fry over slow fire for around 7-10 minutes until the tomato becomes soft and they are lots of juice out. Add around 2L hot      water and simmer the soup for 20 minutes",
        "3. Add fish bones, celery, red onion and oyster mushrooms and continue cooking 10 minutes. Add salt and pepper.",
        "4. Transfer all the content expect the soup to the serving pot and leave the soup in the original wok. Turn up the fire and cook the fish slices for around 30 seconds until they turn white. Transfer the fish slices along with the soup to the serving plate.",
        "5. Heat around 2 tablespoons of oil in wok until slightly smoky and then pour over the fish slices. Sprinkle coriander and green onion before serving."				 					
		],
	pics: [
        {file: picfile, url: help.generateURLForRecipePic(picfile)}
    ],
    _creator:John._id
});

var mushroom = new Recipe({
    dishName: "Fried Oyster Mushroom",
	CookTime: 30,
    comments: ["Fried oyster mushrooms tastes crispy outside and soft inside. Usually it is served with Sichuan peppercorn powder and salt"],
    seasonings:seasoningsArray,
    ingredients:ingredientsArray,
    mainIngredients:mainIngredientsArray,
    Instructions: [
        "1. Remove the tough ends of the oyster mushroom and then split into strips around 2-3 cm wide. After cleaning, slightly squeeze the water out.",
        "2. Sprinkle starch and then add egg, salt and black pepper. Mix well.",
        "3. Mix salt and Sichuan peppercorn powder with a similar ratio of 1:1.",
        "4. Heat around 2 cups of oil in wok and then slide the mushroom strips in for deep-frying until the surface becomes golden brown.",
        "5. Serve directly with Sichuan peppercorn salt."
    ],
	pics: [
        {file: picfile, url: help.generateURLForRecipePic(picfile)}
    ],
    _creator:John._id
});

// Extract and set default values of a recipe from a standard
// express request object
function extractRecipeData(req) {
    var result = {};
    var data = req.body;

    var fields = ['dishName', 'CookTime', 'comments', 'seasonings', 'ingredients',
        'mainIngredients', 'Instructions', 'pics', '_creator'];

    fields.forEach(field => {
        if (data[field]) {
            result[field] = data[field];
        }
    });

    return result;
}

module.exports = {
    listMenu(req, res) {
        res.json(menus);
    },

    // Insert a new menu JSON into the contacts array
    createMenu(req, res) {
        var menu = extractMenuData(req);

        //uses a hash table to store all data in memory.
        // Asssign a random id       
        menu.save(function(err){
        if(err){ return handleError(err);}
        });

        res.status(201).json(menu);
    },

    updateMenu(req, res, next) {
        var MenuId = req.params.MenuId;
        var menu = Menu.findMenuById(menuId, function(err, Menu){
            if(err){ return next(err);}
            return menu;
        });

        if (!menu) {
            res.status(404);
            return next();
        }

        // extractContactData do not alter the contact id
        //通过调用Object.assign函数可以拷贝所有可被枚举的自有属性值到目标对象中
        //Object.assign(target, ...sources)
        menu = Object.assign(menu, extractContactData(req));
        menu.save();
        res.json(menu);
    },

    // Locates an item in the contacts array with the id attribute equals
    // to the req.params.contactId value
    findMenuById(req, res, next) {
        var menuId = req.params.menuId;
        var menu = this.find(menuId);

        if (!menu) {
            res.status(404);
            return next();
        }

        res.json(menu);
    },

    deleteMember(req, res, next) {
        // Ensures that contact exists
        var menuId = req.params.menuId;
        var menu = this.find(menuId);

        if (!menu) {
            res.status(404);
            return next();
        }

        // Drop the object with the given id from the contacts array
        _.remove(menu, item => item.id === menu._id);
        res.json(menu);
    },

    /**
    multer will attach a files attribute in the req object, which we can inspect to
    retrieve information about the uploaded files
    **/
    uploadAvatar(req, res, next) {
        var menuId = req.params.menuId;
        var filename, fullpath;
        
        // Ensure that user has sent the file, exist req.file
        if (!_.has(req, 'file')) {
            return res.status(400).json({
                error: 'Please upload a file in the avatar field'
            });
        }

        // File should be in a valid format with multer attached
        var metadata = req.file;// req.file is the `avatar` file 
        if (!isValidImage(metadata.mimetype)) {
            res.status(400).json({
                error: 'Invalid format, please use jpg, png or gif files'
            });
            return next();
        }

        // Get target contact from database
        var menu = _.find(menus, ['id', menuId]);
        //Iterates over elements of collection, returning the first element predicate 
        //returns truthy for.
        if (!menu) {
            res.status(404).json({
                error: 'contact not found'
            });
            return next();
        }

        // Ensure that avatar path exists --如果给定目录不存在，就创建它
        if (!fs.existsSync(AVATAR_PATH)) {//AVATAR_PATH='./app/avatar'
            fs.mkdirSync(AVATAR_PATH);
            console.log('successfully create dir ' + AVATAR_PATH);
            //mkdirSync()，writeFileSync()，readFileSync() 这三个方法是建立目录、写入文件、读取文件的同步版本
        }

        // Ensure unique filename to prevent name colisions
        var extension = help.getExtension(metadata.originalname);
        do {
            filename = help.generateFilename(extension);
            fullpath = help.generateFullPath(filename, AVATAR_PATH);
        } while (fs.existsSync(fullpath));//检查指定路径的文件或者目录是否存在
        //if fullpath already exists, then we generate another filename 

        // Remove previous avatar if any, remove avatar file
        removeAvatar(menu);

        // Save the file in disk
        var wstream = fs.createWriteStream(fullpath);
        wstream.write(metadata.buffer);
        wstream.end();

        // Update contact by assingn the url of the uploaded file
        menu.avatar = {
            file: filename,
            url: help.generateURLForAvatar(filename)
        };
        // Update contacts hash table 由于这里的contacts表的Id是随机产生的，故并没有保存
        menu.save();

        //Pure API programming, by the user to obtain pictures
        res.json({
            success: true,
            avatar: menu.avatar//http://hostname/avatar/filename
        });
    }
};