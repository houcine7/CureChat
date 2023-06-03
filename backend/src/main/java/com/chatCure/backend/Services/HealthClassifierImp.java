package com.chatCure.backend.Services;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import weka.classifiers.bayes.NaiveBayes;
import weka.core.Attribute;
import weka.core.DenseInstance;
import weka.core.FastVector;
import weka.core.Instances;
import weka.core.converters.ArffLoader;
import weka.core.converters.CSVLoader;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;



@Service
public class HealthClassifierImp implements HealthClassifier {

    private final String TRAINING_DATA_PATH = "static/heath-q-dataset.txt";
    private final String TRAINING_DATA_PATH_ARFF = "static/health.csv";


    @Override
    public void initiate() {
        try {
            // Load the training data

            Instances trainingData = this.loadArff(TRAINING_DATA_PATH_ARFF);

            // Set the class attribute (health-related or not health-related)
            trainingData.setClassIndex(trainingData.numAttributes() - 1);
            System.out.println(trainingData.numAttributes());
            // Train the classifier
            NaiveBayes classifier = new NaiveBayes();
            classifier.buildClassifier(trainingData);

            // Example question to classify
            String question = "What is the color of your car";

            // Preprocess the question
            Instances questionData = this.processQuestion(question,trainingData);
            System.out.println(questionData);
            // Classify the question
            double prediction = classifier.classifyInstance(questionData.firstInstance());

            // Get the predicted class label
            String predictedClass = questionData.classAttribute().value((int) prediction);

            System.out.println("Predicted class: " + predictedClass);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }





    @Override
    public Instances loadArff(String filePath) throws Exception {

        Resource resource = new ClassPathResource(filePath);

        CSVLoader loader =new CSVLoader();
        loader.setSource(resource.getFile());
        Instances data =loader.getDataSet() ;
        return data;
    }

    @Override
    public Instances processQuestion(String qts,Instances trainingData) throws Exception {
        // Preprocess the question and convert it into a suitable format
        // for classification (e.g., bag-of-words or TF-IDF)

        // Tokenize the question into individual words
        String[] words = qts.toLowerCase().split("\\s+");

        // Remove punctuation and non-alphabetic characters
        List<String> cleanWords = new ArrayList<>();
        for (String word : words) {
            word = word.replaceAll("[^a-zA-Z]", "");
            if (!word.isEmpty()) {
                cleanWords.add(word);
            }
        }

        // Create an attribute list with the same structure as the training data
        FastVector attributes = new FastVector(cleanWords.size());
        for (String word : cleanWords) {
            Attribute attr = trainingData.attribute(word);
            if (attr != null) {
                attributes.addElement(attr);
            }
        }

        // Create a new Instances object
        Instances questionData = new Instances("Question", attributes, 1);
        questionData.setClassIndex(questionData.classIndex());

        // Create an instance and set the attribute values
        DenseInstance instance = new DenseInstance(attributes.size());
        instance.setDataset(questionData);

        for (String word : cleanWords) {
            Attribute attr = questionData.attribute(word);
            if (attr != null) {
                instance.setValue(attr, 1.0);
            }
        }

        // Add the instance to the Instances object
        questionData.add(instance);

        return questionData;
    }
}
