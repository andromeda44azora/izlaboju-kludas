import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sb
import pickle
from termcolor import colored as cl
from PIL import Image
from sklearn.model_selection import train_test_split

from sklearn.linear_model import LinearRegression
from sklearn.linear_model import Ridge
from sklearn.linear_model import Lasso
from sklearn.linear_model import BayesianRidge
from sklearn.linear_model import ElasticNet
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.metrics import explained_variance_score as evs
from sklearn.metrics import r2_score as r2


images = []
labels = []

image_address = "AtteluAtpazisana/majas/"

for names in os.listdir(image_address):
    image = Image.open(os.path.join(image_address, names)).resize((200, 200), Image.Resampling.NEAREST)
    images.append(np.array(image))
    if "hous" in names:
        labels.append(1)
    else:
        labels.append(0)

# print(images)


images = np.array(images)
labels = np.array(labels)

images = images/255.0 #
images = images.reshape(images.shape[0], -1)

x_train, x_test, y_train, y_test = train_test_split(images, labels, test_size=0.2, random_state=0)

model = RandomForestClassifier()

model.fit(x_train, y_train)

prediction = model.predict(x_test)

precision = accuracy_score(y_test, prediction)

print(precision)