import os
import time
import random
from datetime import datetime
from supabase import create_client, Client

# ==========================================
# CONFIGURATION SECTION
# ==========================================
# Go to Supabase Dashboard -> Settings -> API to get these.

# 1. Replace with your "Project URL"
SUPABASE_URL = "https://zcdnlkisrqeumistvlay.supabase.co" 

# 2. Replace with your "anon public" Key
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjZG5sa2lzcnFldW1pc3R2bGF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2OTM2NTgsImV4cCI6MjA4MDI2OTY1OH0.Y6ksu9zL1GIBPfD0cKEluQq0UOaD-_vDzh7MNU4skNk" 

# ==========================================

def sync_to_cloud(exercise_name, score, duration):
    """
    Connects to Supabase and inserts a new row into 'exercise_logs'.
    """
    print(f"🔄 Attempting to send: {exercise_name} with score {score}...")

    try:
        # 1. Create the connection
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # 2. Prepare the data packet
        data_payload = {
            "exercise_name": exercise_name,
            "score": score,
            "duration": duration,
            "created_at": datetime.now().isoformat()
            # user_id is left automatic (null) for now
        }
        
        # 3. Send the data to the 'exercise_logs' table
        response = supabase.table('exercise_logs').insert(data_payload).execute()
        
        print(f"✅ SUCCESS: Data saved to Cloud! (ID: {response.data[0]['id']})")
        return True
        
    except Exception as e:
        print(f"❌ ERROR: Could not save to cloud.")
        print(f"Details: {e}")
        return False

# ==========================================
# TEST RUNNER (This runs when you start the script)
# ==========================================
if __name__ == "__main__":
    print("--- STARTING CLOUD TEST ---")
    
    # Let's simulate 3 different exercises happening
    exercises = ["Squat", "Leg Raise", "Arm Curl"]
    
    for i in range(3):
        # Pick a random exercise and a random score
        ex_name = random.choice(exercises)
        rand_score = random.randint(50, 100)
        rand_duration = random.randint(10, 60)
        
        # Send it!
        sync_to_cloud(ex_name, rand_score, rand_duration)
        
        # Wait 1 second before sending the next one
        time.sleep(1)

    print("--- TEST FINISHED ---")