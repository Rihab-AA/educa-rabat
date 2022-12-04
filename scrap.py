import requests
from bs4 import BeautifulSoup
import os
import json
import warnings

warnings.filterwarnings('ignore')

url = 'https://www.dates-concours.ma/universites-publiques/'

#url = "https://www.google.com/maps/place/Université+Hassan+II+de+Casablanca"
response = requests.get(url)
print(response)


soup = BeautifulSoup(response.text, 'html.parser')

x = soup.findAll('a', {'class': 'vc_gitem-link vc_single_image-wrapper vc_box_rounded vc_box_border_grey'})

links = [a["href"] for a in x ]
links = links[:-1]






bd = []

for link in links :
    print('\n','univ :\t', link)
    univ = {}
    r = requests.get(link)
    s = BeautifulSoup(r.text, "html.parser")

    nom = s.findAll('h4', {'class': 'vc_custom_heading'})[0].text
    univ["nom"] = nom
    
    site = s.findAll('a', {'class': 'vc_general vc_btn3 vc_btn3-size-xs vc_btn3-shape-rounded vc_btn3-style-flat vc_btn3-block vc_btn3-icon-left vc_btn3-color-primary'})[1]["href"]
    univ["site"] = site
    
    infos = s.findAll('button', {'class': 'vc_general vc_btn3 vc_btn3-size-xs vc_btn3-shape-square vc_btn3-style-flat vc_btn3-block vc_btn3-color-white'})
    infos = {
        "creation": infos[0].text,
        "nb_new": infos[1].text,
        "total": infos[2].text,
        "nb_etab": infos[3].text,
        "nb_etranger": infos[4].text
    }
    univ["info"] = infos

    

    etabs = []
    es = s.find('section', {'class': 'vc_section vc_custom_1556303044171'}).findAll("div", {'class': 'wpb_column vc_column_container vc_col-sm-4 vc_col-has-fill'})
    for e in es :

        path = None
        try:
            src = e.find('img', {'class': 'vc_single_image-img attachment-full'})['src']
            
            path = './img/img_etab/' + os.path.basename(src)        
            """ with open(path, "wb") as f:
                print('etab_logo :\t',src)
                f.write(requests.get(src).content) """

        except :
            path = None

        lnk, site = None , None
        if e.find("a", {'class': 'vc_general vc_btn3 vc_btn3-size-xs vc_btn3-shape-square vc_btn3-style-classic vc_btn3-color-default'}) :
            lnk = e.find("a", {'class': 'vc_general vc_btn3 vc_btn3-size-xs vc_btn3-shape-square vc_btn3-style-classic vc_btn3-color-default'})["href"] 
            if "dates-concours" in lnk:
                print('etab_site REQUEST:\t',lnk)
                r_ = requests.get(lnk)
                s_ = BeautifulSoup(r_.text, "html.parser")

                for a in s_.findAll("a", {"class": "vc_general vc_btn3 vc_btn3-size-xs vc_btn3-shape-rounded vc_btn3-style-flat vc_btn3-block vc_btn3-icon-left vc_btn3-color-primary"}):
                    if "Site Web" in a.text:
                        site = a["href"]
            
            else :
                print('etab_site NOT REQUEST:\t',lnk)
                site = lnk
        else :
            site = None,

        
        etab = {
            "Nom" : e.find("h3", {'class': 'vc_custom_heading'}).text if e.find("h3", {'class': 'vc_custom_heading'}) else None,
            "site": site, 
            "logo": path
        }
        etabs.append(etab)
    univ["etabs"] = etabs

    bd.append(univ)


""" with open("bd.json", "w+") as file:
    json.dump(bd, file, indent=4) """
 
    
    
    