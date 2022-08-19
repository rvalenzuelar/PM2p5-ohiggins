 # -*- coding: utf-8 -*-

import pandas as pd 
import numpy as np 
from datetime import datetime 

path='/Users/raulvalenzuela/Dropbox/D3/proyecto_02/data/'

# infile = 'Rancagua1_datos_080704_220809_no-header.txt'
# infile = 'Rancagua2_datos_120602_220808_no-header.txt'
# infile = 'Rengo_datos_161122_220809_no-header.txt'
infile = 'SanFdo_datos_160316_220809_no-header.txt'

data = pd.read_csv(path+infile,
                    dtype={'date':str, 'time':np.int32,
                           'valid':str, 'prelim':str,
                           'novalid':str 
                          }
                    )

def convert_float(x):
   if len(x.strip())==0:
       return np.nan
   else:
       return float(x)

def convert_date(x):
    return datetime.strptime(x,'%y%m%d')

data['date'] = data['date'].apply(lambda x:convert_date(x))
data['valid'] = data['valid'].apply(lambda x:convert_float(x))
data['prelim'] = data['prelim'].apply(lambda x:convert_float(x))
data['novalid'] = data['novalid'].apply(lambda x:convert_float(x))

df = data['valid'].to_frame()
df.index = data['date']

df.to_csv('output.csv')