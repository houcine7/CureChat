package com.chatCure.backend.Services;

import weka.core.Instances;

public interface HealthClassifier {

    void initiate() ;

    Instances loadArff(String filePath) throws Exception ;

    Instances processQuestion(String qts,Instances trainingData) throws Exception ;
}
